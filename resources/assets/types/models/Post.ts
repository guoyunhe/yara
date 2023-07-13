import Comment from './Comment';
import Like from './Like';
import Model from './Model';
import Tag from './Tag';
import User from './User';

export default interface Post extends Model {
  title: string;
  content: string;
  userId: number;
  user: User;
  tags: Tag[];
  comments: Comment[];
  commentsCount: number;
  likesSum: number;
  likes?: Like[];
}
