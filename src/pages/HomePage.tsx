import { useQuery } from '@tanstack/react-query';
import { axios } from '../config/axios';

export default function HomePage() {
  const { data } = useQuery({
    queryKey: ['todo'],
    queryFn: async () => {
      const res = await axios.get('/todos');
      return res.data.todos;
    },
    staleTime: 10000
  });
  return (
    <div>
      {data?.map((el: any) => (
        <p key={el.id}>{el.title}</p>
      ))}
    </div>
  );
}
