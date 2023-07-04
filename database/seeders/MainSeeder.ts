import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Image from 'App/Models/Image';
import Tag from 'App/Models/Tag';
import { PostFactory } from 'Database/factories/PostFactory';
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
    await Tag.createMany([
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
    ]);

    await UserFactory.merge([
      { email: 'admin@example.com', password: 'password', role: 'admin' },
      { email: 'user@example.com', password: 'password' },
    ]).createMany(100);

    await PostFactory.with('comments', 30).createMany(50);
  }
}
