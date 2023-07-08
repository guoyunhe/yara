import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Post from 'App/Models/Post';
import PostVote from 'App/Models/PostVote';

export default class PostVotesController {
  public async store({ auth, request, response }: HttpContextContract) {
    const post = await Post.find(request.param('post_id'));

    if (!post) {
      return response.notFound();
    }

    const data = await request.validate({
      schema: schema.create({
        vote: schema.number([rules.range(-1, 1)]),
      }),
    });

    const vote = await PostVote.firstOrCreate({ postId: post.id, userId: auth.user!.id }, data);

    vote.merge(data);
    await vote.save();
    return vote;
  }
}
