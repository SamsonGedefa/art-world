import Image from "next/image";
import Avatar from "../Avatar";
export default function SinglePostInfo({ post }) {
  return (
    <div className="relative flex text-white w-2/3 h-20 m-10">
      <div className="">
        <Avatar size={70} username="user" url="/user_user.jpg" />
      </div>

      <div className="absolute top-0 left-20  flex flex-col px-4">
        <h1 className="text-2xl font-bold">{post._id}</h1>
        <h3>By {post.creator.username}</h3>
      </div>
      <div className="absolute top-0 right-0">{post.createdAt}</div>
    </div>
  );
}
