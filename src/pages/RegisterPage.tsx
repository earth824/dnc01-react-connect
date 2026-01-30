import z from 'zod';
import { axios } from '../config/axios';
import { useState } from 'react';

// export default function RegisterPage() {
//   const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
//     e.preventDefault();
//   };

//   return (
//     <div>
//       <form className="grid gap-6" onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="">First Name</label>
//           <input type="text" className="border px-3 py-1.5 w-full" />
//         </div>

//         <div>
//           <label htmlFor="">Last Name</label>
//           <input type="text" className="border px-3 py-1.5 w-full" />
//         </div>

//         <div>
//           <label htmlFor="">Email</label>
//           <input type="text" className="border px-3 py-1.5 w-full" />
//         </div>

//         <div>
//           <label htmlFor="">Password</label>
//           <input type="text" className="border px-3 py-1.5 w-full" />
//         </div>

//         <div>
//           <button className="bg-amber-500 px-4 py-2 w-full">Register</button>
//         </div>
//       </form>
//     </div>
//   );
// }

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
  const [input, setInput] = useState<RegisterInput>({
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  });

  const [inputError, setInputError] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  });

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, data, error } = registerSchema.safeParse(input);
    if (!success) {
      const nextError: Partial<RegisterInput> = {};
      for (const key in z.flattenError(error).fieldErrors) {
        const value =
          z.flattenError(error).fieldErrors[
            key as keyof Partial<RegisterInput>
          ];
        if (value) {
          nextError[key as keyof Partial<RegisterInput>] = value[0];
        }
      }
      setInputError({ ...inputError, ...nextError });
    }
    // const res = await axios.post('/auth/register');
    // console.log(res);
  };

  return (
    <div>
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">First Name</label>
          <input
            type="text"
            className="border px-3 py-1.5 w-full"
            onChange={handleChangeInput}
            value={input.firstName}
            name="firstName"
          />
        </div>

        <div>
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            className="border px-3 py-1.5 w-full"
            onChange={handleChangeInput}
            value={input.lastName}
            name="lastName"
          />
        </div>

        <div>
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="border px-3 py-1.5 w-full"
            onChange={handleChangeInput}
            value={input.email}
            name="email"
          />
        </div>

        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="border px-3 py-1.5 w-full"
            onChange={handleChangeInput}
            value={input.password}
            name="password"
          />
        </div>

        <div>
          <button className="bg-amber-500 px-4 py-2 w-full">Register</button>
        </div>
      </form>
    </div>
  );
}
