import Image from './Image';
import Model from './Model';
import Tag from './Tag';

export default interface User extends Model {
  avatar?: Image | null;
  avatarId: number | null;
  username: string;
  email: string;
  role: string | null;
  locale: string | null;
  description: string | null;
  tags: Tag[];
}
