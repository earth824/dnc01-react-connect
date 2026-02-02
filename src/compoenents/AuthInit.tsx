import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/useAuthStore';
import { axios } from '../config/axios';

export default function AuthInit() {
  const setAuth = useAuthStore((state) => state.setAuth);

  const { isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const res = await axios.get('/auth/refresh');
      setAuth(res.data.access_token, res.data.user);
    },

    retry: false
  });

  if (isLoading) return <div>Loading ....</div>;
}
