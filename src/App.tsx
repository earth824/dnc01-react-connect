import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAuthStore } from './store/useAuthStore';
import { useEffect, useState } from 'react';
import { axios } from './config/axios';

const queryClient = new QueryClient();

function App() {
  // const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.get('/auth/refresh');
        setAuth(res.data.access_token, res.data.user);
      } catch {
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [setAuth, clearAuth]);
  // console.log('app');
  if (isLoading) return 'Loading...';
  console.log('app');

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster richColors />
    </>
  );
}

export default App;
