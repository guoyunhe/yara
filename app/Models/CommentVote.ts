import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Comment from './Comment';
import Model from './Model';
import User from './User';

export default class CommentVote extends Model {
  @column()
  public userId: number;

  @column()
  public commentId: number;

  @column()
  public vote: number;

  @belongsTo(() => Comment)
  public comment: BelongsTo<typeof Comment>;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}
