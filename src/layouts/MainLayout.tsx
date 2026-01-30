import { Outlet } from 'react-router';
import Header from './Header';

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="p-8">
        <Outlet />
      </main>
    </>
  );
}
