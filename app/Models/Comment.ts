import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Model from './Model';
import Post from './Post';
import User from './User';

export default class Comment extends Model {
  @column()
  public userId: number;

  @column()
  public postId: number;

  @column()
  public commentId: number | null;

  @column()
  public content: string;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>;
}
