import { axios } from '../config/axios';

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

export default function RegisterPage() {
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post('/auth/register');
    console.log(res);
  };

  return (
    <div>
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">First Name</label>
          <input type="text" className="border px-3 py-1.5 w-full" />
        </div>

        <div>
          <label htmlFor="">Last Name</label>
          <input type="text" className="border px-3 py-1.5 w-full" />
        </div>

        <div>
          <label htmlFor="">Email</label>
          <input type="text" className="border px-3 py-1.5 w-full" />
        </div>

        <div>
          <label htmlFor="">Password</label>
          <input type="text" className="border px-3 py-1.5 w-full" />
        </div>

        <div>
          <button className="bg-amber-500 px-4 py-2 w-full">Register</button>
        </div>
      </form>
    </div>
  );
}
