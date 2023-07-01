import Factory from '@ioc:Adonis/Lucid/Factory';
import Post from 'App/Models/Post';
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
  .build();
