import Factory from '@ioc:Adonis/Lucid/Factory';
import CommentVote from 'App/Models/CommentVote';

export const CommentVoteFactory = Factory.define(CommentVote, async ({ faker }) => {
  return {
    vote: faker.helpers.arrayElement([-1, 1, 1]),
  };
}).build();
