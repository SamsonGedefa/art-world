import { usePostPages } from "../../lib/post";
import Link from "next/link";
import { Post } from "@/components/Post";

export default function UserPostList({ user }) {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = usePostPages({
    creatorId: user._id,
  });
  console.log("UserPosts", data);

  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  return (
    <div className="flex-grow h-full px-10 ">
      <ul className="flex flex-wrap space-x-2 space-y-2">
      {posts.map((post) => (
          <li className="relative md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-auto flex-grow group overflow-hidden shadow-lg ">
            <Link
              key={post._id}
              href={`/user/${post.creator.username}/${post._id}`}
            >
              <a>
                <Post post={post} />
              </a>
            </Link>
          </li>
      ))}
      </ul>
    </div>
  );
}
