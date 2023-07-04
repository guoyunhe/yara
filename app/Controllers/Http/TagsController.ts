import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import Tag from 'App/Models/Tag';

export default class TagsController {
  public async index({ request }: HttpContextContract) {
    const { search } = await request.validate({
      schema: schema.create({
        search: schema.string.nullableAndOptional({ trim: true }),
      }),
    });

    let query = Tag.query().preload('icon').withCount('posts').withCount('users');

    if (search) {
      search.split(' ').forEach((word) => {
        query = query.whereILike('name', `%${word}%`);
      });
    }

    return await query;
  }

  public async show({ request, response }: HttpContextContract) {
    const tag = await Tag.find(request.param('id'));
    if (!tag) {
      return response.notFound();
    }
    await tag.load('icon');
    await tag.loadCount('users');
    await tag.loadCount('posts');
    return tag;
  }
}
