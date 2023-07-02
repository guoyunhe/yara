import Factory from '@ioc:Adonis/Lucid/Factory';
import Post from 'App/Models/Post';
import Tag from 'App/Models/Tag';
import User from 'App/Models/User';
import { CommentFactory } from './CommentFactory';

export const PostFactory = Factory.define(Post, async ({ faker }) => {
  const user = await User.query().orderByRaw('RAND()').first();
  return {
    userId: user?.id,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
  };
})
  .relation('comments', () => CommentFactory)
  .after('create', async (factory, model, ctx) => {
    const tags = await Tag.query()
      .orderByRaw('RAND()')
      .limit(ctx.faker.number.int({ min: 1, max: 5 }));
    await model.related('tags').saveMany(tags);
  })
  .build();
