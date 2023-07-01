import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Tag from 'App/Models/Tag';
import User from 'App/Models/User';

export default class extends BaseSeeder {
  public async run() {
    const users = await User.createMany([
      {
        name: 'Admin',
        username: 'admin',
        role: 'admin',
        email: 'admin@example.com',
        password: 'password',
      },
    ]);

    const tags = await Tag.createMany([
      {
        slug: 'arch',
        name: 'Arch Linux',
      },
      {
        slug: 'debian',
        name: 'Debian',
      },
      {
        slug: 'deepin',
        name: 'Deepin(深度)',
      },
      {
        slug: 'fedora',
        name: 'Fedora',
      },
      {
        slug: 'gentoo',
        name: 'Gentoo',
      },
      {
        slug: 'opensuse',
        name: 'openSUSE',
      },
      {
        slug: 'ubuntu',
        name: 'Ubuntu',
      },
    ]);
  }
}
