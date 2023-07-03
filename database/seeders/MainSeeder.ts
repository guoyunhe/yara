import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Image from 'App/Models/Image';
import { PostFactory } from 'Database/factories/PostFactory';
import { TagFactory } from 'Database/factories/TagFactory';
import { UserFactory } from 'Database/factories/UserFactory';

export default class extends BaseSeeder {
  public async run() {
    const opensuse = await Image.createFromFile({
      filePath: 'database/images/opensuse.webp',
      resizeOptions: { width: 512, height: 512, fit: 'cover' },
    });
    const ubuntu = await Image.createFromFile({
      filePath: 'database/images/ubuntu.webp',
      resizeOptions: { width: 512, height: 512, fit: 'cover' },
    });
    await TagFactory.merge([
      {
        slug: 'arch',
        name: 'Arch',
      },
      {
        slug: 'fedora',
        name: 'Fedora',
      },
      {
        slug: 'opensuse',
        name: 'openSUSE',
        iconId: opensuse.id,
      },
      {
        slug: 'ubuntu',
        name: 'Ubuntu',
        iconId: ubuntu.id,
      },
    ]).createMany(10);

    await UserFactory.merge([
      { email: 'admin@example.com', password: 'password', role: 'admin' },
      { email: 'user@example.com', password: 'password' },
    ]).createMany(100);

    await PostFactory.with('comments', 10, (comment) => comment.with('comments', 5)).createMany(
      1000
    );
  }
}
