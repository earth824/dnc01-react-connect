import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';

export default function PublicOnlyRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();
  console.log(location.state);
  if (isAuthenticated) {
    const from = location.state?.from ?? '/';
    console.log(from);
    return <Navigate to={from} replace />;
  }
  return <Outlet />;
}
