import { usePostPages } from "../lib/post";
import Link from "next/link";
import Post from "../components/Post";

export default function UserPosts({ user }) {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = usePostPages({
    creatorId: user._Id,
  });
  console.log("UserPosts", data);

  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  return (
    <div className="flex flex-wrap">
      {posts.map((post) => (
        <Link
          key={post._id}
          href={`/user/${post.creator.username}/${post._id}`}
        >
          <a>
            <Post post={post} />
          </a>
        </Link>
      ))}

      <h1 className="text-white-700"></h1>
    </div>
  );
}

// {posts.map((post) => (
//     <Link
//       key={post._id}
//       href={`/user/${post.creator.username}/post/${post._id}`}
//     >
//       <a className={styles.wrap}>
//         <Post className={styles.post} post={post} />
//       </a>
//     </Link>
//   ))}
