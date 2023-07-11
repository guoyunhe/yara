import Comment from './Comment';
import Model from './Model';
import Tag from './Tag';
import User from './User';
import Vote from './Vote';

export default interface Post extends Model {
  title: string;
  content: string;
  userId: number;
  user: User;
  tags: Tag[];
  comments: Comment[];
  commentsCount: number;
  votesSum: number;
  votes?: Vote[];
}
