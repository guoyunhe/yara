import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Notification from 'App/Models/Notification';

export default class NotificationsController {
  public async index({ auth, request }: HttpContextContract) {
    const {
      read,
      page = 1,
      perPage = 10,
    } = await request.validate({
      schema: schema.create({
        read: schema.boolean.optional(),
        page: schema.number.optional(),
        perPage: schema.number.optional([rules.range(5, 20)]),
      }),
    });

    const query = Notification.query();

    query.orderBy('createdAt', 'desc');

    query.where('userId', auth.user!.id);

    if (typeof read === 'boolean') {
      query.where('read', read);
    }

    return await query.paginate(page, perPage);
  }

  public async update({ request, response }: HttpContextContract) {
    const notification = await Notification.find(request.param('id'));

    if (!notification) {
      return response.notFound();
    }

    const { read } = await request.validate({
      schema: schema.create({
        read: schema.boolean(),
      }),
    });

    notification.merge({ read });
    await notification.save();

    return notification;
  }

  public async destroy({ auth, request, response }: HttpContextContract) {
    const notification = await Notification.find(request.param('id'));
    if (!notification) {
      return response.notFound();
    }
    if (notification.userId !== auth.user!.id) {
      return response.unauthorized();
    }
    await notification.delete();
    return response.ok({});
  }
}
