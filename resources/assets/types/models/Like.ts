import Model from './Model';

export default interface Like extends Model {
  like: number;
  userId: number;
}
