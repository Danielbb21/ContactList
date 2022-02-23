import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contact from 'App/Models/Contact';
import User from 'App/Models/User';

export default class ContactsController {

  public async store({ request, auth }: HttpContextContract) {
    const id = auth.user?.id;
    const data = request.only(['name', 'email', 'phone']);
    const user = await User.find(id);
    if (!user) return;

    const contact = new Contact();
    contact.email = data.email;
    contact.name = data.name;
    contact.phone = data.phone;

    await contact.related('user').associate(user);

    return user;
  }


  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const contact = await Contact.find(id);
    if (!contact) return response.status(400).json({ error: 'Contact not found' });
    return contact;
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const data = request.only(['name', 'email', 'phone']);
    const contact = await Contact.find(id);
    if (!contact) return response.status(400).json({ error: 'Contact not found' });
    contact.merge(data);
    await contact.save();
    return contact;
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const contact = await Contact.find(id);
    if (!contact) return response.status(400).json({ error: 'Contact not found' });

    await contact.delete();
    return response.status(200).json('deleted');
  }
}
