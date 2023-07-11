import Image from './Image';
import Model from './Model';

export default interface Tag extends Model {
  icon?: Image | null;
  iconId: number | null;
  slug: string;
  name: string;
  usersCount: number | null;
  postsCount: number | null;
}
