import Head from "next/head";
import UserPost from "../../../../page-components/UserPost";
import findPostById from "../../../../lib/db/post";
import { useRouter } from "next/router";

export default function UserPostPage({ post }) {
  const { query } = useRouter();

  if (typeof post.createdAt !== "string") {
    post.createdAt = new Date(post.createdAt);
  }
  return (
    <>
      <Head>
        <title>{post.userId}</title>
      </Head>
      <UserPost posts={post} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { id: postId } = context.params;

  const post = await findPostById(id);

  if (!post) {
    return {
      notFound: true,
    };
  }

  console.log("POST_ID", post);

  if (context.params.username !== post.creator.username) {
    return {
      redirect: {
        destination: `/user/${post.creator.username}/post/${post._id}`,
        permanent: false,
      },
    };
  }
  post._id = String(post._id);
  post.userId = String(post.userId);
  post.creator._id = String(post.creator._id);
  post.createdAt = post.createdAt.toJSON();
  return { props: { post } };
}
