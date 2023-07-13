import Like from './Like';
import Model from './Model';
import User from './User';

export default interface Comment extends Model {
  content: string;
  userId: number;
  user: User;
  postId: number | null;
  parentId: number | null;
  likesSum: number;
  likes?: Like[];
}
