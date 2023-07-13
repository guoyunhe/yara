import Factory from '@ioc:Adonis/Lucid/Factory';
import PostLike from 'App/Models/PostLike';

export const PostLikeFactory = Factory.define(PostLike, async ({ faker }) => {
  return {
    like: faker.helpers.arrayElement([-1, 1, 1]),
  };
}).build();
