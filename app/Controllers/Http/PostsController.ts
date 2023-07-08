import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Post from 'App/Models/Post';

export default class PostsController {
  public async index({ auth, request }: HttpContextContract) {
    const {
      userId,
      tagId,
      tagIds,
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
        tagId: schema.number.optional([
          rules.exists({
            table: 'tags',
            column: 'id',
          }),
        ]),
        tagIds: schema.array.optional().members(
          schema.number([
            rules.exists({
              table: 'tags',
              column: 'id',
            }),
          ])
        ),
        search: schema.string.optional({ trim: true }),
        page: schema.number.optional([rules.range(1, Infinity)]),
        perPage: schema.number.optional([rules.range(5, 20)]),
      }),
    });

    const query = Post.query()
      .preload('user')
      .preload('tags')
      .withCount('comments')

      .withAggregate('votes', (query) => {
        query.sum('vote').as('votes_sum');
      });

    if (auth.user) {
      query.preload('votes', (q) => {
        q.where('userId', auth.user!.id);
      });
    }

    if (search) {
      search.split(' ').forEach((word) => {
        query.whereILike('title', `%${word}%`).orWhereILike('content', `%${word}%`);
      });
    }

    if (userId) {
      query.where('userId', userId);
    }

    if (tagId) {
      query.whereHas('tags', (q) => {
        q.where('tags.id', tagId);
      });
    }

    if (tagIds) {
      tagIds.forEach((id) => {
        query.whereHas('tags', (q) => {
          q.where('tags.id', id);
        });
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

  public async show({ auth, request, response }: HttpContextContract) {
    const query = Post.query()
      .where('id', request.param('id'))
      .preload('user')
      .preload('tags', (q) => {
        q.preload('icon');
      })
      .preload('comments', (q) => {
        q.preload('user').withAggregate('votes', (q2) => {
          q2.sum('vote').as('votes_sum');
        });
        if (auth.user) {
          q.preload('votes', (q2) => {
            q2.where('userId', auth.user!.id);
          });
        }
      })
      .withAggregate('votes', (q) => {
        q.sum('vote').as('votes_sum');
      });

    if (auth.user) {
      query.preload('votes', (q) => {
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
