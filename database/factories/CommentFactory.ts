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
