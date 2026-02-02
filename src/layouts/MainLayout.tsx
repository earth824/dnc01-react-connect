import { Outlet, useNavigation } from 'react-router';
import Header from './Header';

export default function MainLayout() {
  // const navigation = useNavigation();
  // if (navigation.state === 'loading') {
  //   console.log('hellloio');
  //   return <h1>Loading ....</h1>;
  // }
  // console.log('hello');
  return (
    <>
      <Header />
      <main className="p-8">
        <Outlet />
      </main>
    </>
  );
}
