import Factory from '@ioc:Adonis/Lucid/Factory';
import Comment from 'App/Models/Comment';
import User from 'App/Models/User';

export const CommentFactory = Factory.define(Comment, async ({ faker }) => {
  const user = await User.query().orderByRaw('RAND()').first();
  return {
    userId: user?.id,
    content: faker.lorem.paragraphs(),
  };
})
  .relation('comments', () => CommentFactory)
  .build();
