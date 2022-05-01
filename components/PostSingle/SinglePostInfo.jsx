import { useMemo } from "react";
import Avatar from "../Avatar";
import { format } from "@lukeed/ms";
import Link from "next/link";
export default function SinglePostInfo({ post }) {
  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(post.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return "Just now";
    return `${format(diff, true)} ago`;
  }, [post.createdAt]);

  return (
    <div className="my-10 flex w-2/3 max-h-40 justify-between text-white">
      <div className="flex space-x-3">
        <div className="">
          <Avatar size={70} username="user" url="/default_user.jpg" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{post.content}</h1>

          <Link href={`/user/${post.creator.username}`}>
            <a className="font-bold underlinehover:text-[#5dec9e]">
              By{" "}
              <span className="underline font-bold">
                {post.creator.username}
              </span>
            </a>
          </Link>
        </div>
      </div>
      <time dateTime={String(post.createdAt)}>{timestampTxt}</time>
    </div>
  );
}
