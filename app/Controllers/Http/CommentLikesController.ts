import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Comment from 'App/Models/Comment';
import CommentLike from 'App/Models/CommentLike';
import Notification from 'App/Models/Notification';

export default class CommentLikesController {
  public async store({ auth, request, response }: HttpContextContract) {
    const comment = await Comment.find(request.param('comment_id'));

    if (!comment) {
      return response.notFound();
    }

    const data = await request.validate({
      schema: schema.create({
        like: schema.number([rules.range(-1, 1)]),
      }),
    });

    const like = await CommentLike.firstOrCreate(
      { commentId: comment.id, userId: auth.user!.id },
      data
    );

    like.merge(data);
    await like.save();

    if (like.like > 0) {
      const noti = await Notification.firstOrCreate(
        {
          type: 'like',
          read: false,
          userId: comment.userId,
          targetType: 'comment',
          targetId: comment.id,
        },
        {
          data: {
            userIds: [like.userId],
          },
        }
      );
      if (!noti.data.userIds.includes(like.userId)) {
        noti.data.userIds.push(like.userId);
        await noti.save();
      }
    }

    return like;
  }
}
