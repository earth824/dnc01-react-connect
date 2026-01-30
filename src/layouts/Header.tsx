import { Link } from 'react-router';

export default function Header() {
  return (
    <header className="bg-amber-400 px-4 py-2 flex justify-between items-center">
      <div>Logo</div>
      <div className="flex gap-4">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </header>
  );
}
