/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';
import Option from 'App/Models/Option';

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'hello' };
  });

  Route.post('/login', 'AuthController.login');
  Route.post('/logout', 'AuthController.logout').middleware('auth');
  Route.post('/register', 'AuthController.register');
  Route.get('/user', 'AuthController.show').middleware('auth');
  Route.put('/user', 'AuthController.update').middleware('auth');
  Route.put('/password', 'AuthController.password').middleware('auth');

  Route.resource('/images', 'ImagesController')
    .apiOnly()
    .middleware({
      store: ['auth'],
      index: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    });

  Route.resource('tags', 'TagsController').only(['index', 'show']);
  Route.resource('posts', 'PostsController')
    .apiOnly()
    .middleware({
      store: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    });
  Route.resource('posts.comments', 'CommentsController')
    .apiOnly()
    .middleware({
      store: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    });
  Route.resource('posts.likes', 'PostLikesController')
    .apiOnly()
    .middleware({
      store: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    });
  Route.resource('comments.likes', 'CommentLikesController')
    .apiOnly()
    .middleware({
      store: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    });
  Route.resource('users', 'UsersController').only(['show']);

  Route.group(() => {
    Route.resource('options', 'OptionsController').apiOnly();
    Route.resource('tags', 'TagsController').apiOnly();
    Route.resource('users', 'UsersController').apiOnly();
  })
    .prefix('/admin')
    .as('admin')
    .namespace('App/Controllers/Http/Admin')
    .middleware(['auth', 'admin']);
}).prefix('/api');

Route.get('*', async ({ view }) => {
  const [siteLogo, siteName, siteDescription] = await Promise.all([
    Option.findBy('key', 'site_logo'),
    Option.findBy('key', 'site_name'),
    Option.findBy('key', 'site_description'),
  ]);
  const html = await view.render('app', {
    SITE_LOGO: siteLogo?.value?.url || '/logo.svg',
    SITE_NAME: siteName?.value || 'Yara',
    SITE_DESCRIPTION: siteDescription?.value || 'A Yara Site',
  });
  return html;
});
