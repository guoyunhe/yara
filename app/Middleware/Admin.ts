import { AuthenticationException } from '@adonisjs/auth/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

/**
 * Admin middleware is meant to restrict un-authenticated access to a given route
 * or a group of routes.
 *
 * You must register this middleware inside `start/kernel.ts` file under the list
 * of named middleware.
 */
export default class AdminMiddleware {
  /**
   * The URL to redirect to when request is Unauthorized
   */
  protected redirectTo = '/login';

  /**
   * Check if the user is admin role
   */
  protected async authenticate(auth: HttpContextContract['auth']) {
    if (auth.user?.role === 'admin') {
      return true;
    }

    throw new AuthenticationException(
      'Unauthorized access',
      'E_UNAUTHORIZED_ACCESS',
      auth.defaultGuard,
      this.redirectTo
    );
  }

  /**
   * Handle request
   */
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    await this.authenticate(auth);
    await next();
  }
}
