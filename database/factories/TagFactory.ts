import Factory from '@ioc:Adonis/Lucid/Factory';
import Tag from 'App/Models/Tag';

export const TagFactory = Factory.define(Tag, ({ faker }) => {
  const name = faker.word.noun();
  return {
    slug: name.toLocaleLowerCase(),
    name,
  };
}).build();
