import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Comment from 'App/Models/Comment';
import CommentVote from 'App/Models/CommentVote';

export default class CommentVotesController {
  public async store({ auth, request, response }: HttpContextContract) {
    const comment = await Comment.find(request.param('comment_id'));

    if (!comment) {
      return response.notFound();
    }

    const data = await request.validate({
      schema: schema.create({
        vote: schema.number([rules.range(-1, 1)]),
      }),
    });

    const vote = await CommentVote.firstOrCreate(
      { commentId: comment.id, userId: auth.user!.id },
      data
    );

    vote.merge(data);
    await vote.save();
    return vote;
  }
}
