import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Image from 'App/Models/Image';

export default class ImagesController {
  public async index({ auth }: HttpContextContract) {
    return await Image.query().where('userId', auth.user!.id);
  }

  public async store({ auth, request }: HttpContextContract) {
    const {
      file,
      width = 2048,
      height = 2048,
      fit = 'contain',
    } = await request.validate({
      schema: schema.create({
        file: schema.file({
          size: '20mb',
          extnames: ['jpg', 'gif', 'png', 'webp'],
        }),
        width: schema.number.optional([rules.range(1, 2048)]),
        height: schema.number.optional([rules.range(1, 2048)]),
        fit: schema.string.optional({ trim: true }, []),
      }),
    });

    const image = await Image.createFromFile({
      filePath: file.tmpPath!,
      userId: auth.user!.id,
      resizeOptions: {
        width,
        height,
        fit: fit === 'cover' ? 'cover' : 'contain',
      },
    });
    return image;
  }

  public async show({ request }: HttpContextContract) {
    const image = await Image.find(request.param('id'));
    return image;
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const image = await Image.find(request.param('id'));
    if (!image) {
      return response.notFound();
    }
    if (image.userId !== auth.user!.id && auth.user!.role !== 'admin') {
      return response.unauthorized();
    }

    // Images are usually not meant to be modified. But it is on your own choice :-)

    return image;
  }

  public async destroy({ auth, request, response }: HttpContextContract) {
    const image = await Image.find(request.param('id'));
    if (!image) {
      return response.notFound();
    }
    if (image.userId !== auth.user!.id && auth.user!.role !== 'admin') {
      return response.unauthorized();
    }
    await image.delete();
    return response.ok({});
  }
}
