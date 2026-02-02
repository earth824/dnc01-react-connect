import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { useEffect, useState } from 'react';
import { axios } from './config/axios';
import { userSchema } from './types/user.type';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await axios.get('/auth/me');
        const user = userSchema.parse(res.data.user);
        setAuth(user);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors />
    </>
  );
}

export default App;
