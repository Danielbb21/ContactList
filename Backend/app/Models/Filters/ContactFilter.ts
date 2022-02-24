import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Contact from 'App/Models/Contact'

export default class ContactFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Contact, Contact>

  // public method (value: any): void {
  //   this.$query.where('name', value)
  // }
  name(name: string) {
    this.$query.where((builder) => {
      builder
      .where('name', 'LIKE', `%${name}%`)
    })
  }
  email(email: string) {
    this.$query.where((builder) => {
      builder
      .where('email', 'LIKE', `%${email}%`)
    })
  }
  phone(phone: string) {
    this.$query.where((builder) => {
      builder
      .where('phone', 'LIKE', `%${phone}%`)
    })
  }

}
