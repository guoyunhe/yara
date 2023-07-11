import Model from './Model';
import User from './User';
import Vote from './Vote';

export default interface Comment extends Model {
  content: string;
  userId: number;
  user: User;
  postId: number | null;
  parentId: number | null;
  votesSum: number;
  votes?: Vote[];
}
