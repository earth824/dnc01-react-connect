import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { axios } from '../config/axios';
import { useAuthStore } from '../store/useAuthStore';
import { useLocation, useNavigate } from 'react-router';

const loginSchema = z.object({
  email: z.string().min(1, 'email is required'),
  password: z.string().min(1, 'password is required')
});

const userSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  role: z.enum(['admin', 'user']),
  imageUrl: z.url().nullable(),
  status: z.boolean()
});

export type User = z.infer<typeof userSchema>;

const loginResponseSchema = z.object({
  access_token: z.jwt(),
  user: userSchema
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginInput>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginSchema)
  });

  const location = useLocation();
  // console.log(location);
  // console.log(location.state?.from);
  const navigate = useNavigate();

  // const { mutate } = useMutation({
  //   mutationFn: async (data: LoginInput) => {
  //     const res = await axios.post('/auth/login', data);

  //     return loginResponseSchema.parse(res.data);
  //   },
  //   onSuccess: (data) => {
  //     setAuth(data.access_token, data.user);
  //     console.log(location?.state?.from ?? '/');
  //     navigate(location.state?.from ?? '/');
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //   }
  // });

  const onSubmit = async (data: LoginInput) => {
    // console.log(data);
    // mutate(data);
    await sim();
    const res = await axios.post('/auth/login', data);
    setAuth(res.data.access_token, res.data.user);
    // navigate(location?.state?.from ?? '/', {
    //   state: { from: location?.state?.from ?? '/' }
    // });
    // console.log(location?.state?.from ?? '/');
  };

  return (
    <div>
      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="border px-3 py-1.5 w-full"
            {...register('email')}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="border px-3 py-1.5 w-full"
            {...register('password')}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <button
            className="bg-green-500 px-4 py-2 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging you in ...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}

function sim() {
  return new Promise((resolve) => setTimeout(() => resolve(null), 5000));
}
