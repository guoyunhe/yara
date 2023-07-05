import Factory from '@ioc:Adonis/Lucid/Factory';
import Post from 'App/Models/Post';
import Tag from 'App/Models/Tag';
import { CommentFactory } from './CommentFactory';
import { PostVoteFactory } from './PostVoteFactory';

export const PostFactory = Factory.define(Post, async ({ faker }) => {
  return {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
  };
})
  .relation('comments', () => CommentFactory)
  .relation('votes', () => PostVoteFactory)
  .after('create', async (factory, model, ctx) => {
    const tags = await Tag.query()
      .orderByRaw('RAND()')
      .limit(ctx.faker.number.int({ min: 1, max: 5 }));
    await model.related('tags').saveMany(tags);
  })
  .build();
