import { string } from '@ioc:Adonis/Core/Helpers';
import { BaseModel, column, LucidModel, SnakeCaseNamingStrategy } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

class CamelCaseNamingStrategy extends SnakeCaseNamingStrategy {
  public serializedName(_model: LucidModel, attributeName: string): string {
    return attributeName;
  }

  public relationLocalKey(
    relation: string,
    model: typeof BaseModel,
    relatedModel: typeof BaseModel
  ) {
    if (relation === 'belongsTo') {
      return relatedModel.primaryKey;
    }

    return model.primaryKey;
  }

  public relationForeignKey(
    relation: string,
    model: typeof BaseModel,
    relatedModel: typeof BaseModel
  ) {
    if (relation === 'belongsTo') {
      return string.camelCase(`${relatedModel.name}_${relatedModel.primaryKey}`);
    }

    return string.camelCase(`${model.name}_${model.primaryKey}`);
  }

  public paginationMetaKeys() {
    return {
      total: 'total',
      perPage: 'perPage',
      currentPage: 'currentPage',
      lastPage: 'lastPage',
      firstPage: 'firstPage',
      firstPageUrl: 'firstPageUrl',
      lastPageUrl: 'lastPageUrl',
      nextPageUrl: 'nextPageUrl',
      previousPageUrl: 'previousPageUrl',
    };
  }
}

export default class Model extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy();

  /** ID */
  @column({ isPrimary: true })
  public id: number;

  /** Timestamp of creation */
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  /** Timestamp of modification */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
