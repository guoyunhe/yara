import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'notifications';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('user_id').unsigned().notNullable().references('users.id').onDelete('CASCADE');

      table.string('type').notNullable().index();
      table.boolean('read').notNullable().defaultTo(0).index();
      table.string('target_type').nullable().index();
      table.integer('target_id').unsigned().nullable().index();
      table.json('data').notNullable();

      table.timestamp('created_at').notNullable().defaultTo(this.raw('CURRENT_TIMESTAMP')).index();
      table.timestamp('updated_at').notNullable().defaultTo(this.raw('CURRENT_TIMESTAMP'));
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
