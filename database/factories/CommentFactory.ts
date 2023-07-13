import Factory from '@ioc:Adonis/Lucid/Factory';
import Comment from 'App/Models/Comment';
import { CommentLikeFactory } from './CommentLikeFactory';

export const CommentFactory = Factory.define(Comment, async ({ faker }) => {
  return {
    content: faker.lorem.paragraphs({ min: 1, max: 5 }, '\n\n'),
  };
})
  .relation('likes', () => CommentLikeFactory)
  .after('create', async (factory, model, ctx) => {
    await model.load('post');
    await model.post.load('comments');
    const comment = ctx.faker.helpers.arrayElement(model.post.comments);
    if (comment.id !== model.id && Math.random() > 0.2) {
      model.parentId = comment.id;
      await model.save();
    }
  })
  .build();
