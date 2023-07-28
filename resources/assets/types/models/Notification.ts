import Model from './Model';

export default interface Notification extends Model {
  type: string;
  userId: number;
  targetType: string;
  targetId: number;
  read: boolean;
  data: any;
}
