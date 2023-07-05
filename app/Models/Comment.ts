import { BelongsTo, HasMany, belongsTo, column, computed, hasMany } from '@ioc:Adonis/Lucid/Orm';
import CommentVote from './CommentVote';
import Model from './Model';
import Post from './Post';
import User from './User';

export default class Comment extends Model {
  @column()
  public userId: number;

  @column()
  public postId: number | null;

  @column()
  public parentId: number | null;

  @column()
  public content: string;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>;

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>;

  @hasMany(() => CommentVote)
  public votes: HasMany<typeof CommentVote>;

  @computed()
  public get votesSum(): number | null {
    return this.$extras.votes_sum ? Number(this.$extras.votes_sum) : null;
  }
}
