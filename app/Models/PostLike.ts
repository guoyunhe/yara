import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Model from './Model';
import Post from './Post';
import User from './User';

export default class PostLike extends Model {
  @column()
  public userId: number;

  @column()
  public postId: number;

  @column()
  public like: number;

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}
