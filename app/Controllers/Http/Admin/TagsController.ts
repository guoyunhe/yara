import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Tag from 'App/Models/Tag';
import BaseTagsController from '../TagsController';

export default class TagsController extends BaseTagsController {
  public async store({ request }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        slug: schema.string({ trim: true }, [
          rules.alphaNum({ allow: ['underscore', 'dash'] }),
          rules.unique({ table: 'tags', column: 'slug', caseInsensitive: true }),
          rules.maxLength(255),
        ]),
        name: schema.string({ trim: true }, [rules.maxLength(255)]),
        iconId: schema.number.nullableAndOptional([
          rules.exists({
            table: 'images',
            column: 'id',
          }),
        ]),
      }),
    });

    const tag = await Tag.create(data);
    await tag.load('icon');
    return tag;
  }

  public async update({ request, response }: HttpContextContract) {
    const tag = await Tag.find(request.param('id'));
    if (!tag) {
      return response.notFound();
    }

    const data = await request.validate({
      schema: schema.create({
        slug: schema.string.optional({ trim: true }, [
          rules.alphaNum({ allow: ['underscore', 'dash'] }),
          rules.unique({
            table: 'tags',
            column: 'slug',
            caseInsensitive: true,
            whereNot: { id: tag.id },
          }),
          rules.maxLength(255),
        ]),
        name: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
        iconId: schema.number.nullableAndOptional([
          rules.exists({
            table: 'images',
            column: 'id',
          }),
        ]),
      }),
    });

    tag.merge(data);
    await tag.save();
    await tag.load('icon');

    return tag;
  }

  public async destroy({ request, response }: HttpContextContract) {
    const tag = await Tag.find(request.param('id'));
    if (!tag) {
      return response.notFound();
    }
    await tag.delete();
    return response.ok({});
  }
}
