import { useEffect, useState } from 'react';
import { axios } from '../config/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTodo } from '../hooks/useTodo';

type Todo = {
  id: number;
  title: string;
};

// export default function TodoPage() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchTodo = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get('/todos');
//         setTodos(res.data.todos);
//       } catch {
//         setError('fetch todo failed');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTodo();
//   }, []);

//   if (loading) return <h1 className="animate-spin">spinner</h1>;

//   if (error) return <h1 className="text-red-500">{error}</h1>;

//   return (
//     <div>
//       {todos.map((el) => (
//         <p key={el.id}>{el.title}</p>
//       ))}
//     </div>
//   );
// }

// im memory
// { todo: [{id: 1, title: ''}, ...] } ==> revalidate(updaqte data in the cache) when to revalidate (5m, 15m, 1m

export default function TodoPage() {
  const { data, isPending, error } = useTodo();

  const [input, setInput] = useState('');

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (title: string) => {
      await axios.post('/todos', { title });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] });
    },
    onError: () => {}
  });

  return (
    <>
      <input
        type="text"
        className="border"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <button
        onClick={() => {
          mutate(input);
        }}
      >
        Create
      </button>
      <div>
        {data?.map((el) => (
          <p key={el.id}>{el.title}</p>
        ))}
      </div>
    </>
  );
}

// fetch 0: data=>fresh
//      5: data=> fresh
//      11: data=> stale
