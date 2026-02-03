import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { axios } from '../config/axios';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { loginResponseSchema } from '../types/user.type';

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginSchema)
  });

  const setAuth = useAuthStore((state) => state.setAuth);

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    // sent credentials to backend server
    try {
      const res = await axios.post('/auth/login', data);
      // console.log('sucessssss', res);
      const { user, access_token } = loginResponseSchema.parse(res.data);
      setAuth(user, access_token);
      toast.success('logged in successfully');
    } catch (err) {
      // console.log('tessssss errro', err);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
        return;
      }
      // console.log(err);
      toast.error('something went wrong. try again later.');
    }
  };

  return (
    <div>
      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className={errors.email ? 'text-red-500' : undefined}>
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="border px-3 py-1.5 w-full"
            {...register('email')}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className={errors.password ? 'text-red-500' : undefined}>
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="border px-3 py-1.5 w-full"
            {...register('password')}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <button className="bg-green-500 px-4 py-2 w-full">Login</button>
        </div>
      </form>
    </div>
  );
}
