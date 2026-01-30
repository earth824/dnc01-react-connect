import z from 'zod';
import { axios } from '../config/axios';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z.object({
  firstName: z.string().min(1, 'first name cannot be empty'),
  lastName: z.string().min(1, 'last name cannot be empty'),
  email: z.email('invalid email address'),
  password: z
    .string()
    .regex(
      /^[a-zA-Z0-9]{6,}$/,
      'password must have at least 6 characters and have only letter and number'
    )
});

type RegisterInput = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<RegisterInput>({
    defaultValues: { email: '', firstName: '', lastName: '', password: '' },
    resolver: zodResolver(registerSchema)
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    try {
      await axios.post('/auth/register', data);
      toast.success(
        'Your account has been created. Please log in to continue.'
      );
      navigate('/login');
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.status === 409) {
          setError('email', { message: 'email already in use' });
          return;
        }
        toast.error(err.response?.data.message);
        return;
      }
      toast.error('something went wrong');
    }
  };

  return (
    <div>
      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">First Name</label>
          <input
            type="text"
            className="border px-3 py-1.5 w-full"
            {...register('firstName')} // {name: 'firstName', onChange: ƒ, onBlur: ƒ, ref: ƒ}
            // name='firstName'
            // onBlue = e => {}
            // onChange = e => {}
            // ref={}
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            className="border px-3 py-1.5 w-full"
            {...register('lastName')}
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="border px-3 py-1.5 w-full"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className={errors.password ? 'text-red-500' : undefined}>
          <label htmlFor="">Password</label>
          <input
            type="text"
            className="border px-3 py-1.5 w-full"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div>
          <button
            className="bg-amber-500 px-4 py-2 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating your account ...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
}

// export default function RegisterPage() {
//   const [input, setInput] = useState<RegisterInput>({
//     email: '',
//     firstName: '',
//     lastName: '',
//     password: ''
//   });

//   const [inputError, setInputError] = useState<
//     Partial<Record<keyof RegisterInput, string[]>>
//   >({});

//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChangeInput = (
//     e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
//   ) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const { success, data, error } = registerSchema.safeParse(input);
//     if (!success) {
//       // console.log(z.flattenError(error));
//       // const nextError: Partial<RegisterInput> = {};
//       // for (const key in z.flattenError(error).fieldErrors) {
//       //   const value =
//       //     z.flattenError(error).fieldErrors[
//       //       key as keyof Partial<RegisterInput>
//       //     ];
//       //   if (value) {
//       //     nextError[key as keyof Partial<RegisterInput>] = value[0];
//       //   }
//       // }
//       // setInputError({ ...inputError, ...nextError });
//       setInputError(z.flattenError(error).fieldErrors);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       await axios.post('/auth/register', data);
//       toast.success(
//         'Your account has been created. Please log in to continue.'
//       );
//       navigate('/login');
//     } catch (err) {
//       if (err instanceof AxiosError) {
//         if (err.status === 409) {
//           setInputError({ email: ['email already in use'] });
//           return;
//         }
//         toast.error(err.response?.data.message);
//         return;
//       }
//       toast.error('something went wrong');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <form className="grid gap-6" onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="">First Name</label>
//           <input
//             type="text"
//             className="border px-3 py-1.5 w-full"
//             onChange={handleChangeInput}
//             value={input.firstName}
//             name="firstName"
//           />
//           {inputError.firstName && <p>{inputError.firstName[0]}</p>}
//         </div>

//         <div>
//           <label htmlFor="">Last Name</label>
//           <input
//             type="text"
//             className="border px-3 py-1.5 w-full"
//             onChange={handleChangeInput}
//             value={input.lastName}
//             name="lastName"
//           />
//           {inputError.lastName && (
//             <p className="text-red-500">{inputError.lastName[0]}</p>
//           )}
//         </div>

//         <div>
//           <label htmlFor="">Email</label>
//           <input
//             type="text"
//             className="border px-3 py-1.5 w-full"
//             onChange={handleChangeInput}
//             value={input.email}
//             name="email"
//           />
//           {inputError.email && <p>{inputError.email[0]}</p>}
//         </div>

//         <div>
//           <label htmlFor="">Password</label>
//           <input
//             type="password"
//             className="border px-3 py-1.5 w-full"
//             onChange={handleChangeInput}
//             value={input.password}
//             name="password"
//           />
//           {inputError.password && <p>{inputError.password[0]}</p>}
//         </div>

//         <div>
//           <button
//             className="bg-amber-500 px-4 py-2 w-full"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Creating your account ...' : 'Register'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
