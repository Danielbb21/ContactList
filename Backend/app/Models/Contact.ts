import { DateTime } from 'luxon'
import { compose } from '@ioc:Adonis/Core/Helpers';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User';
import ContactFilter from './Filters/ContactFilter';
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter';

export default class Contact extends compose(BaseModel, Filterable) {

  public static $filter = () => ContactFilter;

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'name' })
  public name: string;

  @column({ columnName: 'email' })
  public email: string;

  @column({ columnName: 'phone' })
  public phone: string;

  @column({ columnName: 'image' })
  public image: string;

  @column({columnName: 'user_id'})
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
