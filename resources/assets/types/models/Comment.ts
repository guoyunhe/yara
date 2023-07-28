import Like from './Like';
import Model from './Model';
import Post from './Post';
import User from './User';

export default interface Comment extends Model {
  content: string;
  userId: number;
  user: User;
  postId: number | null;
  parentId: number | null;
  likesSum: number;
  likes?: Like[];
  parent?: Comment;
  post?: Post;
}
