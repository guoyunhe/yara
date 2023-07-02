import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Tag from 'App/Models/Tag';

export default class TagsController {
  public async index({ request }: HttpContextContract) {
    const {
      search,
      page = 1,
      perPage = 10,
    } = await request.validate({
      schema: schema.create({
        search: schema.string.nullableAndOptional({ trim: true }),
        page: schema.number.optional([rules.range(1, 2048)]),
        perPage: schema.number.optional([rules.range(5, 20)]),
      }),
    });

    let query = Tag.query().preload('icon');

    if (search) {
      search.split(' ').forEach((word) => {
        query = query.whereILike('name', `%${word}%`);
      });
    }

    return await query.paginate(page, perPage);
  }

  public async show({ request, response }: HttpContextContract) {
    const tag = await Tag.find(request.param('id'));
    if (!tag) {
      return response.notFound();
    }
    await tag.load('icon');
    return tag;
  }
}
