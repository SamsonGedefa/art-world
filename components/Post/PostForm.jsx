import React, { useRef, useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import ImageList from "./Image";
import { AiTwotoneCamera } from "react-icons/ai";
import { VscTag } from "react-icons/vsc";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import { updatePostState } from "../../atoms/postAtom";
import axios from "axios";
import { usePostPages } from "@/lib/post";
import { FiX } from "react-icons/fi";
import Tag from "../Tag";
export default function PostForm() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [handlePost, setHandlePost] = useRecoilState(updatePostState);
  const { mutate } = usePostPages();
  const [tags, setTags] = useState([]);
  const [tagDisplay, setTagDisplay] = useState(false);

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const value = e.target.value;
    if (!value.trim()) return;

    setTags([...tags, value]);
    e.target.value = "";
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  const uploadFile = useCallback(
    async (e) => {
      e.preventDefault();

      console.log("TAGs", tags);
      if (!file) {
        toast("Image is required");
        return;
      }
      // if (!content) {
      //   toast("Title is required");
      //   return;
      // }
      const formData = new FormData();

      formData.append("tags", JSON.stringify(tags));

      formData.append("image", file);

      formData.append("content", content);

      try {
        await axios.post("/api/post", formData, {
          headers: { "content-type": "multipart/form-data" },
        });
        mutate(); // refresh feed
      } catch (err) {
        toast.error(err);
      } finally {
        setLoading(false);
        setModalOpen(false);
        setHandlePost(true);
      }
    },
    [file, image, mutate, tags]
  );

  useEffect(() => {
    if (file) {
      console.log(file);
      let objectURL = URL.createObjectURL(file);
      setImage(objectURL);
    }
    setTags([]);

    return () => URL.revokeObjectURL(objectURL);
  }, [file]);

  function selectedFile(e) {
    e.preventDefault();
    setFile(e.target.files[0]);
  }

  const removeImage = () => {
    setImage(null);
    setTagDisplay(!tagDisplay);
  };

  return (
    <div
      className={` max-w-2xl  p-3 flex space-x-3  scrollbar-hide ${
        loading && "opacity-60"
      } ${image && ""} `}
    >
      <img
        src="default_user.jpg"
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
      />

      <form
        onSubmit={uploadFile}
        className=" divide-y divide-gray-700 w-full max-h-90 "
      >
        <div className={` ${image && "pb-7"} ${content && "space-y-2.5"} `}>
          <textarea
            value={content}
            name="content"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Give it a title!"
            rows="2"
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px] resize-none"
          />

          {image && (
            <div className=" ">
              <ImageList image={image} removeImage={removeImage} />
            </div>
          )}

          {tagDisplay && (
            <div className="overflow-auto">
              <Tag
                tags={tags}
                removeTag={removeTag}
                handleKeyDown={handleKeyDown}
              />
            </div>
          )}
        </div>
        {!loading && (
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <div className="icon">
                <label htmlFor="fileInput">
                  <AiTwotoneCamera size={25} className="text-[#5dec9e]" />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => selectedFile(e)}
                />
              </div>
              {image && (
                <div onClick={() => setTagDisplay(!tagDisplay)}>
                  <VscTag size={22} className="text-[#5dec9e]" />
                </div>
              )}
            </div>

            <button
              className="bg-[#5dec9e] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#93e4b7] disabled:hover:bg-[#97bda8] disabled:opacity-50 disabled:cursor-default"
              disabled={!content && !file}
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
