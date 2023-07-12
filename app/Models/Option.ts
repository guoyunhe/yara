import { column } from '@ioc:Adonis/Lucid/Orm';
import Model from './Model';

export default class Option extends Model {
  @column()
  public key: string;

  @column({ consume: (value) => JSON.parse(value), prepare: (value) => JSON.stringify(value) })
  public value: any;
}
