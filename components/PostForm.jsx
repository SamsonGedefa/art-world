import React, { useRef, useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import ImageList from "@/components/Image";
import { AiTwotoneCamera } from "react-icons/ai";
import { BiShocked } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";

export default function PostForm({ removePostForm }) {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [display, setDisplay] = useState(false);

  const { data: session } = useSession();

  const uploadFile = useCallback(
    async (e) => {
      e.preventDefault({ setDisplay });

      if (!files) {
        toast("No file selected");
        return;
      }
      const formData = new FormData();

      files.forEach((file, i) => {
        formData.append(i, file);
      });

      try {
        let request = await fetch("/api/auth/post", {
          method: "post",
          body: formData,
        });
        const response = await request.json();

        console.log("Response", response);
      } catch (err) {
        toast.error(err);
      }

      setLoading(false);
      removePostForm();
    },
    [files, images]
  );

  useEffect(() => {
    if (images) {
      images.forEach((img) => console.log("IMAGES " + img));
    }
  }, [images?.length]);

  useEffect(() => {
    let objectURL = "";
    files.forEach((file) => {
      objectURL = URL.createObjectURL(file);
      setImages((images) => [...images, objectURL]);
    });

    return () => URL.revokeObjectURL(objectURL);
  }, [files]);

  function selectedFile(e) {
    const fileArr = Array.from(e.target.files);
    setFiles(fileArr);
  }

  const removeImage = (id) => {
    setImages((images) => images.filter((img, i) => i !== id));
  };

  return (
    <div
      className={`border-b max-w-2xl border-gray-700 p-3 flex space-x-3  scrollbar-hide ${
        loading && "opacity-60"
      }`}
    >
      <img
        src="default_user.jpg"
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
        onClick={signOut}
      />

      <form onSubmit={uploadFile} className="divide-y divide-gray-700 w-full">
        <div className={`${images && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share your work..."
            rows="2"
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
          />

          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 grid-rows-2 w-3/4 h-80">
              <ImageList images={images} removeImage={removeImage} />
            </div>
          ) : (
            <div>...</div>
          )}
        </div>
        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div className="icon">
                <label htmlFor="fileInput">
                  <AiTwotoneCamera size={25} className="text-[#e65a5a]" />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => selectedFile(e)}
                />
              </div>

              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <BiShocked size={25} className="text-[#e65a5a]" />
              </div>
            </div>
            <button
              className="bg-[#e65a5a] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
              disabled={!input && !files}
              onClick={() => {
                uploadFile;
              }}
            >
              Share
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

// export default function AddPost() {
//   const [display, setDisplay] = useState(false);
//   return (
//     <div>
//       <button
//         className="bg-[#e65a5a] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
//         // disabled={display}
//         hidden={display}
//         onClick={() => setDisplay(true)}
//       >
//         Share
//       </button>

//       {display && <PostForm />}
//     </div>
//   );
// }
