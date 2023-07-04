import {
  BelongsTo,
  ManyToMany,
  belongsTo,
  column,
  computed,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm';
import Image from './Image';
import Model from './Model';
import Post from './Post';
import User from './User';

export default class Tag extends Model {
  @column()
  public iconId: number | null;

  @column()
  public slug: string;

  @column()
  public name: string;

  @belongsTo(() => Image, { foreignKey: 'iconId' })
  public icon: BelongsTo<typeof Image>;

  @manyToMany(() => Post, {
    pivotTable: 'post_tags',
  })
  public posts: ManyToMany<typeof Post>;

  @manyToMany(() => User, {
    pivotTable: 'user_tags',
  })
  public users: ManyToMany<typeof User>;

  @computed()
  public get postsCount(): number | null {
    return this.$extras.posts_count;
  }

  @computed()
  public get usersCount(): number | null {
    return this.$extras.users_count;
  }
}
