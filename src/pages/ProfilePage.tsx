import { useEffect, useRef, useState } from 'react';
import { axios } from '../config/axios';
import { useQuery } from '@tanstack/react-query';
import z from 'zod';
import { useAuthStore } from '../store/useAuthStore';
import defaultImage from '../assets/user.png';

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

  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  console.log(image);
  const user = useAuthStore((state) => state.user);
  const uploadImage = useAuthStore((state) => state.uploadImage);
  if (isPending) return <h1>Spinnnerr</h1>;

  return (
    <div>
      <div className="flex flex-col items-center gap-6">
        <div
          className="size-60  rounded-full overflow-hidden"
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : (user?.imageUrl ?? defaultImage)
            }
            alt=""
          />
        </div>
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setImage(e.target.files[0]);
            }
          }}
        />
        {image && (
          <button
            className="bg-green-500 px-4 py-2 w-full "
            onClick={async () => {
              const formData = new FormData();
              formData.append('image', image);
              const res = await axios.patch('/auth', formData);
              console.log(res);
              setImage(null);
              uploadImage(res.data.imageUrl);
            }}
          >
            Upload
          </button>
        )}
      </div>
      <form action="">
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div>
            <label htmlFor="">Frist Name</label>
            <input type="text" className="border px-3 py-1.5 w-full" />
          </div>
          <div>
            <label htmlFor="">Frist Name</label>
            <input type="text" className="border px-3 py-1.5 w-full" />
          </div>
          <div className="col-span-2">
            <button className="bg-green-500 px-4 py-2 w-full">Update</button>
          </div>
        </div>
      </form>
    </div>
  );
}
