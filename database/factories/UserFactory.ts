import Factory from '@ioc:Adonis/Lucid/Factory';
import Tag from 'App/Models/Tag';
import User from 'App/Models/User';
import { PostFactory } from './PostFactory';

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    username: faker.internet.userName().toLocaleLowerCase(),
    description: faker.lorem.paragraphs({ min: 1, max: 5 }, '\n\n'),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
})
  .relation('posts', () => PostFactory)
  .after('create', async (_factory, model, ctx) => {
    const tags = await Tag.query()
      .orderByRaw('RAND()')
      .limit(ctx.faker.number.int({ min: 1, max: 5 }));
    await model.related('tags').saveMany(tags);
  })
  .build();
