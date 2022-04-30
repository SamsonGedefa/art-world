import Image from "next/image";
import Avatar from "../Avatar";

export default function SinglePostInfo({ post }) {
  return (
    <div className="my-10 flex w-2/3 max-h-40 justify-between text-white">
      <div className="flex space-x-3">
        <div className="">
          <Avatar size={70} username="user" url="/default_user.jpg" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{post.content}</h1>
          <h3>
            By{" "}
            <span className="underline font-bold">{post.creator.username}</span>
          </h3>
        </div>
      </div>
      <div className="">{post.createdAt}</div>
    </div>
  );
}
