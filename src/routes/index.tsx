import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { path: 'register', Component: RegisterPage },
      { path: 'login', Component: LoginPage }
    ]
  }
]);
