import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Comment from 'App/Models/Comment';
import Notification from 'App/Models/Notification';
import Post from 'App/Models/Post';
import { DateTime } from 'luxon';

export default class CommentsController {
  public async store({ auth, request, response }: HttpContextContract) {
    const post = await Post.find(request.param('post_id'));

    if (!post) {
      return response.notFound();
    }

    const { content, parentId } = await request.validate({
      schema: schema.create({
        content: schema.string(),
        parentId: schema.number.nullableAndOptional([
          rules.exists({
            table: 'comments',
            column: 'id',
          }),
        ]),
      }),
    });

    const comment = await Comment.create({
      content,
      userId: auth.user!.id,
      postId: post.id,
      parentId: parentId || null,
    });

    await comment.load('user');

    let notiAttr: Partial<Notification>;

    if (parentId) {
      const parent = await Comment.find(parentId);
      notiAttr = {
        userId: parent!.userId,
        targetType: 'comment',
        targetId: parent!.id,
      };
    } else {
      notiAttr = {
        userId: post.userId,
        targetType: 'post',
        targetId: post.id,
      };
    }

    if (notiAttr) {
      const noti = await Notification.firstOrCreate(
        {
          type: 'comment',
          read: false,
          ...notiAttr,
        },
        {
          data: {
            commentIds: [],
            userIds: [],
          },
        }
      );
      noti.createdAt = DateTime.now();
      noti.data.commentIds.push(comment.id);
      noti.data.userIds.push(comment.userId);
      await noti.save();
    }

    return comment;
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const comment = await Comment.find(request.param('id'));

    if (!comment) {
      return response.notFound();
    }

    if (comment.userId !== auth.user!.id && auth.user!.role !== 'admin') {
      return response.unauthorized();
    }

    const { content } = await request.validate({
      schema: schema.create({
        content: schema.string.optional(),
      }),
    });

    comment.merge({ content });
    await comment.save();

    await comment.load('user');
    await comment.loadAggregate('likes', (q2) => {
      q2.sum('like').as('likes_sum');
    });
    await comment.load('likes', (q2) => {
      q2.where('userId', auth.user!.id);
    });

    return comment;
  }

  public async destroy({ auth, request, response }: HttpContextContract) {
    const comment = await Comment.find(request.param('id'));
    if (!comment) {
      return response.notFound();
    }
    if (comment.userId !== auth.user!.id && auth.user!.role !== 'admin') {
      return response.unauthorized();
    }
    await comment.delete();
    return response.ok({});
  }
}
