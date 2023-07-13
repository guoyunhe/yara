import Factory from '@ioc:Adonis/Lucid/Factory';
import CommentLike from 'App/Models/CommentLike';

export const CommentLikeFactory = Factory.define(CommentLike, async ({ faker }) => {
  return {
    like: faker.helpers.arrayElement([-1, 1, 1]),
  };
}).build();
