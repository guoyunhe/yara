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
import PostVote from './PostVote';
import Tag from './Tag';
import User from './User';

export default class Post extends Model {
  @column()
  public userId: number;

  @column()
  public title: string;

  @column()
  public content: string;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>;

  @hasMany(() => PostVote)
  public votes: HasMany<typeof PostVote>;

  @manyToMany(() => Tag, {
    pivotTable: 'post_tags',
  })
  public tags: ManyToMany<typeof Tag>;

  @computed()
  public get commentsCount(): number | null {
    return this.comments ? this.comments.length : this.$extras.comments_count;
  }

  @computed()
  public get votesSum(): number | null {
    return this.$extras.votes_sum ? Number(this.$extras.votes_sum) : null;
  }
}
