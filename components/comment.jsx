import Avatar from "./Avatar";
import { useMemo } from "react";
export default function Comment({ comment }) {
  //   const timestampTxt = useMemo(() => {
  //     const diff = Date.now() - new Date(comment.createdAt).getTime();
  //     if (diff < 1 * 60 * 1000) return "Just now";
  //     return `${format(diff, true)} ago`;
  //   }, [comment.createdAt]);

  return (
    <div className="flex  w-full my-5 h-20">
      <div className="flex  w-full h-full -px-4">
        <div className="px-4">
          <Avatar size={30} username="user" url="/default_user.jpg" />
        </div>
        <div className="w-full h-full flex flex-col  bg-gray-700 px-2">
          <div className="flex space-x-4">
            <div className="font-bold">{comment.creator.username}</div>
            <div>{comment.createdAt}</div>
          </div>

          <div>{comment.content}</div>
        </div>
      </div>
    </div>
  );
}
