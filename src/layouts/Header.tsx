import { Link } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';
import { axios } from '../config/axios';
import defaultImage from '../assets/user.png';

export default function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const user = useAuthStore((state) => state.user);

  const handleClickLogout = async () => {
    await axios.post('/auth/logout');
    clearAuth();
  };

  return (
    <header className="bg-amber-400 px-4 py-2 flex justify-between items-center">
      <div>Logo</div>
      <div className="flex gap-4 items-center">
        {isAuthenticated ? (
          <>
            <Link to="/">Home</Link>
            <button onClick={handleClickLogout}>Logout</button>
            <Link to="/profile">
              <div className="size-10 rounded-full overflow-hidden">
                <img src={user?.imageUrl ?? defaultImage} alt="" />
              </div>
            </Link>
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
