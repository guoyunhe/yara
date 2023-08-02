import {
  BelongsTo,
  HasMany,
  ManyToMany,
  belongsTo,
  column,
  computed,
  hasMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm';
import Comment from './Comment';
import Model from './Model';
import PostLike from './PostLike';
import Tag from './Tag';
import User from './User';

export default class Post extends Model {
  @column()
  public userId: number;

  @column()
  public title: string;

  @column()
  public content: string;

  @column()
  public views: number;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>;

  @hasMany(() => PostLike)
  public likes: HasMany<typeof PostLike>;

  @manyToMany(() => Tag, {
    pivotTable: 'post_tags',
  })
  public tags: ManyToMany<typeof Tag>;

  @computed()
  public get commentsCount(): number | null {
    return this.comments ? this.comments.length : this.$extras.comments_count;
  }

  @computed()
  public get likesSum(): number | null {
    return this.$extras.likes_sum ? Number(this.$extras.likes_sum) : null;
  }
}
