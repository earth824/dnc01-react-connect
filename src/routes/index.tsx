import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import ProtectedRoute from '../layouts/ProtectedRoute';
import PublicOnly from '../layouts/PublicOnly';

// /profile
export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { path: 'contact', element: <h1>Contact Page</h1> },
      {
        Component: PublicOnly,
        children: [
          { path: 'register', Component: RegisterPage },
          { path: 'login', Component: LoginPage }
        ]
      },
      {
        Component: ProtectedRoute,
        children: [
          { index: true, Component: HomePage },
          { path: 'profile', Component: ProfilePage }
        ]
      }
    ]
  }
]);
