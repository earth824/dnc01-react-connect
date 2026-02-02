import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from '../layouts/ProtectedRoute';
import PublicOnlyRoute from '../layouts/PublicOnlyRoute';
import { axios } from '../config/axios';
import { useAuthStore } from '../store/useAuthStore';
import ProfilePage from '../pages/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        Component: ProtectedRoute,
        children: [
          {
            path: 'profile',
            element: <ProfilePage />
          },
          {
            index: true,
            element: <>Home</>
          }
        ]
      },
      {
        Component: PublicOnlyRoute,
        children: [
          { path: 'register', Component: RegisterPage },
          { path: 'login', Component: LoginPage }
        ]
      }
    ]
  }
]);

// hydrateFallbackElement: <h1>Loading ...</h1>,
// middleware: [
//   async (_, next) => {
//     if (!useAuthStore.getState().isAuthenticated) {
//       const res = await axios.get('/auth/refresh');
//       useAuthStore.getState().setAuth(res.data.access_token, res.data.user);
//       console.log('test');
//     }
//     await next();
//   }
// ],
// shouldRevalidate
