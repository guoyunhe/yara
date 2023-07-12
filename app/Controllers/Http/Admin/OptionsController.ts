import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Option from 'App/Models/Option';

export default class OptionsController {
  public async index({ request }: HttpContextContract) {
    const {
      search,
      page = 1,
      perPage = 10,
    } = await request.validate({
      schema: schema.create({
        search: schema.string.nullableAndOptional({ trim: true }),
        page: schema.number.optional([rules.range(1, Infinity)]),
        perPage: schema.number.optional([rules.range(5, 50)]),
      }),
    });

    const query = Option.query();

    if (search) {
      search.split(' ').forEach((word) => {
        query.whereILike('key', `%${word}%`);
      });
    }

    return await query.paginate(page, perPage);
  }

  public async store({ request }: HttpContextContract) {
    const { key } = await request.validate({
      schema: schema.create({
        key: schema.string({ trim: true }, [
          rules.alphaNum({ allow: ['underscore'] }),
          // rules.unique({ table: 'options', column: 'key', caseInsensitive: true }),
          rules.maxLength(255),
        ]),
      }),
    });

    const option = await Option.create({ key, value: request.input('value', null) });

    return option;
  }

  public async show({ request, response }: HttpContextContract) {
    const option = await Option.findBy('key', request.param('id'));
    if (!option) {
      return response.notFound();
    }
    return option;
  }

  public async update({ request, response }: HttpContextContract) {
    const option = await Option.findBy('key', request.param('id'));
    if (!option) {
      return response.notFound();
    }

    option.value = request.input('value', null);
    await option.save();

    return option;
  }

  public async destroy({ request, response }: HttpContextContract) {
    const option = await Option.findBy('key', request.param('id'));
    if (!option) {
      return response.notFound();
    }

    await option.delete();

    return option;
  }
}
