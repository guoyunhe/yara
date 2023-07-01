import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'comments';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('user_id').unsigned().notNullable().references('users.id').onDelete('CASCADE');
      table.integer('post_id').unsigned().notNullable().references('posts.id').onDelete('CASCADE');
      table
        .integer('comment_id')
        .unsigned()
        .nullable()
        .references('comments.id')
        .onDelete('CASCADE');

      table.text('content').notNullable().index();

      table.timestamp('created_at').notNullable().defaultTo(this.raw('CURRENT_TIMESTAMP'));
      table.timestamp('updated_at').notNullable().defaultTo(this.raw('CURRENT_TIMESTAMP'));
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
