import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Notification from 'App/Models/Notification';
import Post from 'App/Models/Post';
import PostLike from 'App/Models/PostLike';

export default class PostLikesController {
  public async store({ auth, request, response }: HttpContextContract) {
    const post = await Post.find(request.param('post_id'));

    if (!post) {
      return response.notFound();
    }

    const data = await request.validate({
      schema: schema.create({
        like: schema.number([rules.range(-1, 1)]),
      }),
    });

    const like = await PostLike.firstOrCreate({ postId: post.id, userId: auth.user!.id }, data);

    like.merge(data);
    await like.save();

    if (like.like > 0) {
      const noti = await Notification.firstOrCreate(
        {
          type: 'like',
          read: false,
          userId: post.userId,
          targetType: 'post',
          targetId: post.id,
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
