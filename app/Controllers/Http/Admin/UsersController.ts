import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const {
      role,
      email,
      page = 1,
      perPage = 10,
    } = await request.validate({
      schema: schema.create({
        email: schema.string.nullableAndOptional({ trim: true }, [rules.email()]),
        role: schema.string.nullableAndOptional({ trim: true }),
        page: schema.number.optional([rules.range(1, 2048)]),
        perPage: schema.number.optional([rules.range(5, 20)]),
      }),
    });

    let query = User.query();

    if (email) {
      query = query.where('email', email);
    }

    if (role) {
      query = query.where('role', role);
    }

    return await query.paginate(page, perPage);
  }

  public async show({ request }: HttpContextContract) {
    const user = await User.find(request.param('id'));
    return user;
  }

  public async destroy({ request, response }: HttpContextContract) {
    const user = await User.find(request.param('id'));
    if (!user) {
      return response.notFound();
    }
    await user.delete();
    return response.ok({});
  }
}
