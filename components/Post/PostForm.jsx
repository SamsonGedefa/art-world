import React, { useRef, useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import ImageList from "./Image";
import { AiTwotoneCamera } from "react-icons/ai";
import { BiShocked } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import { updatePostState } from "../../atoms/postAtom";
import axios from "axios";
import { usePostPages } from "@/lib/post";

export default function PostForm() {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [handlePost, setHandlePost] = useRecoilState(updatePostState);
  const { mutate } = usePostPages();

  const uploadFile = useCallback(
    async (e) => {
      e.preventDefault();

      if (!files) {
        toast("No file selected");
        return;
      }
      const formData = new FormData();

      files.forEach((file, i) => {
        formData.append(i, file);
      });

      formData.append("content", content);

      try {
        await axios.post("/api/post", formData, {
          headers: { "content-type": "multipart/form-data" },
        });
        mutate(); // refreshs post as it's bounded to the SWR key
      } catch (err) {
        toast.error(err);
      } finally {
        setLoading(false);
        setModalOpen(false);
        setHandlePost(true);
      }
    },
    [files, images, mutate]
  );

  useEffect(() => {
    let objectURL = "";
    files.forEach((file) => {
      objectURL = URL.createObjectURL(file);
      setImages((images) => [...images, objectURL]);
    });

    return () => URL.revokeObjectURL(objectURL);
  }, [files]);

  function selectedFile(e) {
    if (e.target.files.length > 4) {
      toast("Please only select upto 4 files");
      return;
    }
    const fileArr = Array.from(e.target.files);
    setFiles(fileArr);
  }

  const removeImage = (id) => {
    setImages((images) => images.filter((img, i) => i !== id));
  };

  return (
    <div
      className={` max-w-2xl  p-3 flex space-x-3  scrollbar-hide ${
        loading && "opacity-60"
      }`}
    >
      <img
        src="default_user.jpg"
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
      />

      <form onSubmit={uploadFile} className="divide-y divide-gray-700 w-full">
        <div className={`${images && "pb-7"} ${content && "space-y-2.5"}`}>
          <textarea
            value={content}
            name="content"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Give it a title!"
            rows="2"
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px] resize-none"
          />

          {images.length > 0 && (
            // grid grid-cols-2 gap-2 grid-rows-2 w-3/4 h-80
            <div
              className={`space-y-2 ${
                images.length == 1 ? "columns-1xl" : "columns-2"
              } `}
            >
              <ImageList images={images} removeImage={removeImage} />
            </div>
          )}
        </div>
        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div className="icon">
                <label htmlFor="fileInput">
                  <AiTwotoneCamera size={25} className="text-[#e65a5a] " />
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

              <div
                className="icon"
                // onClick={() => setShowEmojis(!showEmojis)
              >
                <BiShocked size={25} className="text-[#e65a5a]" />
              </div>
            </div>
            <button
              className="bg-[#e65a5a] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
              disabled={!content && !files}
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
