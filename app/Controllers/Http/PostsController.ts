import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Post from 'App/Models/Post';

export default class PostsController {
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

    let query = Post.query().preload('user').preload('tags');

    if (search) {
      search.split(' ').forEach((word) => {
        query = query.whereILike('title', `%${word}%`).orWhereILike('content', `%${word}%`);
      });
    }

    return await query.paginate(page, perPage);
  }

  public async store({ auth, request }: HttpContextContract) {
    const { title, tags, content } = await request.validate({
      schema: schema.create({
        title: schema.string({ trim: true }, [rules.maxLength(255)]),
        content: schema.string(),
        tags: schema.array().members(
          schema.object().members({
            id: schema.number([
              rules.exists({
                table: 'images',
                column: 'id',
              }),
            ]),
          })
        ),
      }),
    });

    const post = await Post.create({ title, content, userId: auth.user!.id });
    await post.related('tags').sync(tags.map((tag) => tag.id));
    await post.load('tags');
    await post.load('user');
    return post;
  }

  public async show({ request, response }: HttpContextContract) {
    const post = await Post.find(request.param('id'));

    if (!post) {
      return response.notFound();
    }

    await post.load('comments');
    await post.load('tags');
    await post.load('user');

    return post;
  }

  public async update({ request, response }: HttpContextContract) {
    const post = await Post.find(request.param('id'));

    if (!post) {
      return response.notFound();
    }

    const { title, content, tags } = await request.validate({
      schema: schema.create({
        title: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
        content: schema.string.optional(),
        tags: schema.array.optional().members(
          schema.object().members({
            id: schema.number([
              rules.exists({
                table: 'images',
                column: 'id',
              }),
            ]),
          })
        ),
      }),
    });

    post.merge({ title, content });
    await post.save();

    if (tags) {
      await post.related('tags').sync(tags.map((tag) => tag.id));
    }

    await post.load('tags');
    await post.load('user');

    return post;
  }

  public async destroy({ auth, request, response }: HttpContextContract) {
    const post = await Post.find(request.param('id'));
    if (!post) {
      return response.notFound();
    }
    if (post.userId !== auth.user!.id && auth.user!.role !== 'admin') {
      return response.unauthorized();
    }
    await post.delete();
    return response.ok({});
  }
}
