import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UsersController {
  public async show({ request, response }: HttpContextContract) {
    const user = await User.query()
      .where('id', request.param('id'))
      .orWhere('username', request.param('id'))
      .preload('avatar')
      .preload('tags')
      .withCount('posts')
      .first();

    if (!user) {
      return response.notFound();
    }

    return user;
  }
}
