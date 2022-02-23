import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {

  public async createSession({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

}
