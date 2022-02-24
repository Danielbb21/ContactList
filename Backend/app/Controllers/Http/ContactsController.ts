import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contact from 'App/Models/Contact';
import User from 'App/Models/User';
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs';
import path from 'path';


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

    const file = request.file('image');

    if (file) {
      const imageName = new Date().getTime().toString() + `.${file.extname}`
      await file.move(Application.publicPath('uploads'), {
        name: imageName
      })
      contact.image = `/uploads/${imageName}`
    }
    await contact.related('user').associate(user);
    await contact.save();
    return contact;
  }


  public async index({ auth, request,response }: HttpContextContract) {
    const id = auth.user?.id;
    if (!id) return;
    const {page} = request.qs();
    console.log('request.qs', request.qs());
    const user = await User.find(id);
    if (!user) return response.status(400).json({ error: 'User not found' });
    const contacts = await Contact.query().where('userId', id).paginate(page , 10);

    return contacts;
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
    const file = request.file('image');
    if (file) {
      if (contact.image !== null) {
        const imagePath = path.join('public/', contact.image);

        const contactImageExists = await fs.promises.stat(imagePath);

        if (contactImageExists) {

          await fs.promises.unlink(imagePath);
        }
      }

      const imageName = new Date().getTime().toString() + `.${file.extname}`
      await file.move(Application.publicPath('uploads'), {
        name: imageName
      })

      contact.image = `/uploads/${imageName}`

    }

    contact.merge(data);
    await contact.save();
    return contact;
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const contact = await Contact.find(id);
    if (!contact) return response.status(400).json({ error: 'Contact not found' });
    if (contact.image !== null) {
      const imagePath = path.join('public/', contact.image);

      const contactImageExists = await fs.promises.stat(imagePath);

      if (contactImageExists) {

        await fs.promises.unlink(imagePath);
      }
    }

    await contact.delete();
    return response.status(200).json('deleted');
  }
}
