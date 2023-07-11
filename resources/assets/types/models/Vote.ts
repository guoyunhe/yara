import Model from './Model';

export default interface Vote extends Model {
  vote: number;
  userId: number;
}
