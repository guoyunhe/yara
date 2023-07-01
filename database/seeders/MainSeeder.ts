import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import { PostFactory } from 'Database/factories/PostFactory';
import { TagFactory } from 'Database/factories/TagFactory';
import { UserFactory } from 'Database/factories/UserFactory';

export default class extends BaseSeeder {
  public async run() {
    const tags = await TagFactory.merge([
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
      },
      {
        slug: 'ubuntu',
        name: 'Ubuntu',
      },
    ]).createMany(10);

    const users = await UserFactory.merge([
      { email: 'admin@example.com', password: 'password', role: 'admin' },
      { email: 'user@example.com', password: 'password' },
    ]).createMany(100);

    const posts = await PostFactory.with('comments', 10, (comment) =>
      comment.with('comments', 5)
    ).createMany(1000);
  }
}
