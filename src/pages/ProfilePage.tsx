import { useEffect } from 'react';
import { axios } from '../config/axios';
import { useAuthStore } from '../store/useAuthStore';

export default function ProfilePage() {
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchMe = async () => {
      const res = await axios.get('/auth/me');
      console.log(res);
    };
    if (accessToken) fetchMe();
  }, [accessToken]);

  return <div>ProfilePage</div>;
}
