import { RequireAuth } from '@guoyunhe/react-auth';
import { lazy } from 'react';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/home';
import NotificationsPage from './pages/notifications';
import PostPage from './pages/post';
import PostListPage from './pages/post-list';
import SubmitPage from './pages/submit';
import TagPage from './pages/tag';
import UserPage from './pages/user';

// layouts
const AppLayout = lazy(() => import('./layouts/app'));
const AdminLayout = lazy(() => import('./layouts/admin'));
const AuthLayout = lazy(() => import('./layouts/auth'));

// auth pages
const LoginPage = lazy(() => import('./pages/login'));
const RegisterPage = lazy(() => import('./pages/register'));

// app pages
const SettingsPage = lazy(() => import('./pages/settings'));

// admin pages
const AdminDashboardPage = lazy(() => import('./pages/admin-dashboard'));
const AdminTagListPage = lazy(() => import('./pages/admin-tag-list'));
const AdminUserListPage = lazy(() => import('./pages/admin-user-list'));
const AdminSettingsPage = lazy(() => import('./pages/admin-settings'));

// error pages
const NotFound = lazy(() => import('./pages/not-found'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        children: [
          {
            path: 'p/:postId',
            element: <PostPage />,
          },
        ],
      },
      {
        path: 't/:tagId',
        element: <TagPage />,
        children: [
          {
            path: 'p/:postId',
            element: <PostPage />,
          },
        ],
      },
      {
        path: 's/:search',
        element: <PostListPage />,
        children: [
          {
            path: 'p/:postId',
            element: <PostPage />,
          },
        ],
      },
      {
        path: 'submit',
        element: (
          <RequireAuth>
            <SubmitPage />
          </RequireAuth>
        ),
      },
      {
        path: 't/:tagId/submit',
        element: (
          <RequireAuth>
            <SubmitPage />
          </RequireAuth>
        ),
      },
      {
        path: 'p/:postId/edit',
        element: (
          <RequireAuth>
            <SubmitPage />
          </RequireAuth>
        ),
      },
      {
        path: 't/:tagId/p/:postId/edit',
        element: (
          <RequireAuth>
            <SubmitPage />
          </RequireAuth>
        ),
      },
      {
        path: 'u/:userId',
        element: <UserPage />,
        children: [
          {
            path: 'p/:postId',
            element: <PostPage />,
          },
        ],
      },
      {
        path: 'notifications',
        element: (
          <RequireAuth>
            <NotificationsPage />
          </RequireAuth>
        ),
      },
      {
        path: 'settings',
        element: (
          <RequireAuth>
            <SettingsPage />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: 'admin',
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
      },
      {
        path: 'tags',
        element: <AdminTagListPage />,
      },
      {
        path: 'users',
        element: <AdminUserListPage />,
      },
      {
        path: 'settings',
        element: <AdminSettingsPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
