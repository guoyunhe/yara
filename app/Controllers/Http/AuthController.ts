import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class AuthController {
  public async login({ auth, i18n, request, response }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');

    try {
      const token = await auth.use('api').attempt(email, password);
      const user = await User.findBy('email', email);
      await user?.load('avatar');
      return { token, user };
    } catch {
      return response.unauthorized({ message: i18n.formatMessage('auth.invalidCredetials') });
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke();
    return {
      revoked: true,
    };
  }

  public async register({ auth, i18n, request }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        name: schema.string({ trim: true }, [rules.maxLength(255)]),
        username: schema.string({ trim: true }, [
          rules.alphaNum({ allow: ['underscore'] }),
          rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
          rules.maxLength(255),
        ]),
        email: schema.string({ trim: true }, [
          rules.email(),
          rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
          rules.maxLength(255),
        ]),
        password: schema.string({ trim: true }, [
          rules.minLength(8),
          rules.maxLength(32),
          rules.confirmed('passwordConfirm'),
        ]),
      }),
    });
    const user = await User.create({ locale: i18n.locale, ...data });
    const token = await auth.use('api').attempt(data.email, data.password);
    return { user, token };
  }

  public async show({ auth }: HttpContextContract) {
    await auth.user?.load('avatar');
    return auth.user;
  }

  public async update({ auth, request }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        avatarId: schema.number.nullableAndOptional([
          rules.exists({
            table: 'images',
            column: 'id',
          }),
        ]),
        name: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
        username: schema.string.optional({ trim: true }, [
          rules.alphaNum({ allow: ['underscore'] }),
          rules.unique({
            table: 'users',
            column: 'username',
            caseInsensitive: true,
            whereNot: { id: auth.user!.id },
          }),
          rules.maxLength(255),
        ]),
        email: schema.string.optional({ trim: true }, [
          rules.email(),
          rules.unique({
            table: 'users',
            column: 'email',
            caseInsensitive: true,
            whereNot: { id: auth.user!.id },
          }),
          rules.maxLength(255),
        ]),
        locale: schema.string.optional({ trim: true }),
        description: schema.string.optional({ trim: true }),
      }),
    });

    auth.user!.merge(data);
    await auth.user!.save();
    await auth.user!.load('avatar');
    return auth.user;
  }

  public async password({ auth, i18n, request, response }: HttpContextContract) {
    const { oldPassword, password } = await request.validate({
      schema: schema.create({
        oldPassword: schema.string({ trim: true }),
        password: schema.string({ trim: true }, [
          rules.minLength(8),
          rules.maxLength(32),
          rules.confirmed('passwordConfirm'),
        ]),
      }),
    });

    try {
      await auth.use('api').verifyCredentials(auth.user!.email, oldPassword);
    } catch {
      return response.unprocessableEntity({
        errors: [
          {
            field: 'oldPassword',
            message: i18n.formatMessage('auth.oldPasswordIncorrect'),
          },
        ],
      });
    }

    if (oldPassword === password) {
      return response.unprocessableEntity({
        errors: [
          {
            field: 'password',
            message: i18n.formatMessage('auth.oldAndNewPasswordEqual'),
          },
        ],
      });
    }

    auth.user!.password = password;
    await auth.user!.save();

    return response.ok({ message: i18n.formatMessage('auth.passwordUpdatedSuccessfully') });
  }
}
