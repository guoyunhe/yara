import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'user_tags';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('user_id').unsigned().notNullable().references('users.id').onDelete('CASCADE');
      table.integer('tag_id').unsigned().notNullable().references('tags.id').onDelete('CASCADE');

      table.unique(['user_id', 'tag_id']);

      table.timestamp('created_at').notNullable().defaultTo(this.raw('CURRENT_TIMESTAMP'));
      table.timestamp('updated_at').notNullable().defaultTo(this.raw('CURRENT_TIMESTAMP'));
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
