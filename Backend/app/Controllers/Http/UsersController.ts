import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password']);
    const user = new User();
    user.name = data.name;
    user.password = data.password;
    user.email = data.email;

    await user.save();

    return response.status(201).json(user);
  }


  public async show({  auth }: HttpContextContract) {
    const id = auth.user?.id;
    if(!id) return;
    const user = await User.query().where('id', id).preload('contacts');

    return user;
  }
}
