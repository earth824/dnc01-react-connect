// import { useEffect } from 'react';
// import { axios } from '../config/axios';
// import { useAuthStore } from '../store/useAuthStore';

import { useRef, useState } from 'react';
import defaultImage from '../assets/user.png';

export default function ProfilePage() {
  // { current: null }
  const fileInputEl = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);

  const imageSrc = image ? URL.createObjectURL(image) : defaultImage;

  const handleClickImage = () => {
    fileInputEl.current?.click();
  };

  const handleChangeImage = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  return (
    <div>
      <div className="flex flex-col gap-6 items-center">
        <div
          className="size-60 rounded-full overflow-hidden"
          onClick={handleClickImage}
        >
          <img src={imageSrc} alt="" />
        </div>
        {/* { current: document.querySelector('input') } */}
        <input
          type="file"
          ref={fileInputEl}
          className="hidden"
          onChange={handleChangeImage}
        />
        {image && (
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500">Upload</button>
            <button
              className="px-4 py-2 bg-gray-200"
              onClick={() => {
                setImage(null);
                if (fileInputEl.current) {
                  fileInputEl.current.value = '';
                }
              }}
            >
              Cancel
            </button>
          </div>
        )}
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
