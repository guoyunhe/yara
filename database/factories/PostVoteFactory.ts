import Factory from '@ioc:Adonis/Lucid/Factory';
import PostVote from 'App/Models/PostVote';

export const PostVoteFactory = Factory.define(PostVote, async ({ faker }) => {
  return {
    vote: faker.helpers.arrayElement([-1, 1, 1]),
  };
}).build();
