import { Link } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';
import { axios } from '../config/axios';

export default function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleClickLogout = async () => {
    await axios.post('/auth/logout');
    clearAuth();
  };

  return (
    <header className="bg-amber-400 px-4 py-2 flex justify-between items-center">
      <div>Logo</div>
      <div className="flex gap-4">
        {isAuthenticated ? (
          <>
            <Link to="/">Home</Link>
            <button onClick={handleClickLogout}>Logout</button>
            <Link to="/profile">Profile</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
