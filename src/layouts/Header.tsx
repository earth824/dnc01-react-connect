import { Link } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';

export default function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <header className="bg-amber-400 px-4 py-2 flex justify-between items-center">
      <div>Logo</div>
      <div className="flex gap-4">
        {isAuthenticated ? (
          <>
            <Link to="/">Home</Link>
            <button>Logout</button>
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
