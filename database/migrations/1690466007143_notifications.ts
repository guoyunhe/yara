import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'notifications';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('type').notNullable();
      table.integer('user_id').unsigned().notNullable().references('users.id').onDelete('CASCADE');
      table.integer('target_type').unsigned().nullable();
      table.integer('target_id').unsigned().nullable();
      table.json('data').notNullable();
      table.boolean('read').notNullable().defaultTo(0);

      table.timestamp('created_at').notNullable().defaultTo(this.raw('CURRENT_TIMESTAMP'));
      table.timestamp('updated_at').notNullable().defaultTo(this.raw('CURRENT_TIMESTAMP'));
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
