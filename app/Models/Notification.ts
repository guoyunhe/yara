import { column } from '@ioc:Adonis/Lucid/Orm';
import Model from './Model';

export default class Notification extends Model {
  @column()
  public type: string;

  @column()
  public userId: number | null;

  @column()
  public targetType: string | null;

  @column()
  public targetId: number | null;

  @column({ consume: (value) => JSON.parse(value), prepare: (value) => JSON.stringify(value) })
  public data: any;

  @column({ consume: (value) => Boolean(value), prepare: (value) => Number(value) })
  public read: boolean;
}
