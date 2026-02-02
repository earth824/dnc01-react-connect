import { useEffect } from 'react';
import { axios } from '../config/axios';
import { useQuery } from '@tanstack/react-query';
import z from 'zod';

const userSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  role: z.enum(['admin', 'user']),
  imageUrl: z.url().nullable(),
  status: z.boolean()
});

export default function ProfilePage() {
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const res = await axios.get('/auth/me');
  //     console.log(res);
  //   };
  //   fetchProfile();
  // }, []);
  const { isPending, data } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await axios.get('/auth/me');
      const data = userSchema.parse(res.data.user);
      return data;
    },
    gcTime: 10000

    // refetchInterval: 5 * 1000
    // staleTime: 30 * 60 * 1000,
    // refetchOnMount: true,
    // refetchOnWindowFocus: 'always'
  });

  if (isPending) return <h1>Spinnnerr</h1>;

  return <div>{data?.firstName}</div>;
}
