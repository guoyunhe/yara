import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Post from 'App/Models/Post';

export default class PostsController {
  public async index({ auth, request }: HttpContextContract) {
    const {
      userId,
      username,
      tagId,
      tagSlug,
      search,
      page = 1,
      perPage = 10,
    } = await request.validate({
      schema: schema.create({
        userId: schema.number.optional([
          rules.exists({
            table: 'users',
            column: 'id',
          }),
        ]),
        username: schema.string.optional([
          rules.exists({
            table: 'users',
            column: 'username',
          }),
        ]),
        tagId: schema.number.optional([
          rules.exists({
            table: 'tags',
            column: 'id',
          }),
        ]),
        tagSlug: schema.string.optional([
          rules.exists({
            table: 'tags',
            column: 'slug',
          }),
        ]),
        search: schema.string.optional({ trim: true }),
        page: schema.number.optional([]),
        perPage: schema.number.optional([rules.range(5, 20)]),
      }),
    });

    const query = Post.query()
      .preload('user')
      .preload('tags')
      .withCount('comments')
      .withAggregate('likes', (query) => {
        query.sum('like').as('likes_sum');
      });

    query.orderBy('createdAt', 'desc');

    if (auth.user) {
      query.preload('likes', (q) => {
        q.where('userId', auth.user!.id);
      });
    }

    if (search) {
      search
        .split(' ')
        .filter(Boolean)
        .forEach((word) => {
          query.where((q) => {
            q.whereILike('title', `%${word}%`).orWhereILike('content', `%${word}%`);
          });
        });
    }

    if (userId) {
      query.where('userId', userId);
    }

    if (username) {
      query.whereHas('user', (q) => {
        q.where('username', username);
      });
    }

    if (tagId) {
      query.whereHas('tags', (q) => {
        q.where('tags.id', tagId);
      });
    }

    if (tagSlug) {
      query.whereHas('tags', (q) => {
        q.where('tags.slug', tagSlug);
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
                table: 'tags',
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

  public async show({ auth, request, response }: HttpContextContract) {
    const query = Post.query()
      .where('id', request.param('id'))
      .preload('user')
      .preload('tags', (q) => {
        q.preload('icon');
      })
      .preload('comments', (q) => {
        q.preload('user').withAggregate('likes', (q2) => {
          q2.sum('like').as('likes_sum');
        });
        if (auth.user) {
          q.preload('likes', (q2) => {
            q2.where('userId', auth.user!.id);
          });
        }
      })
      .withAggregate('likes', (q) => {
        q.sum('like').as('likes_sum');
      });

    if (auth.user) {
      query.preload('likes', (q) => {
        q.where('userId', auth.user!.id);
      });
    }

    const post = await query.first();

    if (!post) {
      return response.notFound();
    }

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
                table: 'tags',
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
