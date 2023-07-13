import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Comment from 'App/Models/Comment';
import CommentLike from 'App/Models/CommentLike';

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
    return like;
  }
}
