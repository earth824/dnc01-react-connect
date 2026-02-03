// import { useEffect } from 'react';
// import { axios } from '../config/axios';
// import { useAuthStore } from '../store/useAuthStore';

import defaultImage from '../assets/user.png';

export default function ProfilePage() {
  return (
    <div>
      <div className="flex flex-col gap-6 items-center">
        <div className="size-60 rounded-full">
          <img src={defaultImage} alt="" />
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-500">Upload</button>
          <button className="px-4 py-2 bg-gray-200">Cancel</button>
        </div>
      </div>
    </div>
  );
}

// export default function ProfilePage() {
//   const accessToken = useAuthStore((state) => state.accessToken);

//   useEffect(() => {
//     const fetchMe = async () => {
//       try {
//         const res = await axios.get('/auth/me');
//         console.log('sucessssss', res);
//       } catch (err) {
//         console.log('tessssss errro', err);
//       }
//     };
//     if (accessToken) fetchMe();
//   }, [accessToken]);

//   return <div>ProfilePage</div>;
// }
