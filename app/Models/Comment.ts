import { BelongsTo, HasMany, belongsTo, column, computed, hasMany } from '@ioc:Adonis/Lucid/Orm';
import CommentLike from './CommentLike';
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

  @belongsTo(() => Comment, { foreignKey: 'parentId' })
  public parent: BelongsTo<typeof Comment>;

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>;

  @hasMany(() => CommentLike)
  public likes: HasMany<typeof CommentLike>;

  @computed()
  public get likesSum(): number | null {
    return this.$extras.likes_sum ? Number(this.$extras.likes_sum) : null;
  }
}
