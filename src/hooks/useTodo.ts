import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useTodo = () =>
  useQuery({
    queryKey: ['todo'],
    queryFn: async () => {
      const res = await axios.get('/todos');
      return res.data.todos;
    },
    staleTime: 10000,
    refetchOnMount: false,
    refetchOnWindowFocus: 'always',
    refetchOnReconnect: false
  });
