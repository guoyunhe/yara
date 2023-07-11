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

Route.group(() => {
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
  Route.resource('posts.votes', 'PostVotesController')
    .apiOnly()
    .middleware({
      store: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    });
  Route.resource('comments.votes', 'CommentVotesController')
    .apiOnly()
    .middleware({
      store: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    });
  Route.resource('users', 'UsersController').only(['show']);

  Route.group(() => {
    Route.resource('tags', 'TagsController').apiOnly();
    Route.resource('users', 'UsersController').apiOnly();
  })
    .prefix('/admin')
    .as('admin')
    .namespace('App/Controllers/Http/Admin')
    .middleware(['auth', 'admin']);

  Route.get('/', async ({ i18n }) => {
    return { hello: i18n.formatMessage('messages.hello') };
  });
}).prefix('/api');

Route.get('*', async ({ view }) => {
  const html = await view.render('app');

  return html;
});
