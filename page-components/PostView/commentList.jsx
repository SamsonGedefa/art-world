import { useCommentPages } from "@/lib/comment";
import Comment from "@/components/comment";
export default function CommentList({ post }) {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = useCommentPages(
    { postId: post._id }
  );

  const comments = data
    ? data.reduce((acc, val) => [...acc, ...val.comments], [])
    : [];

  return (
    <div className="flex flex-col w-2/3 text-white ">
      {comments.map((comment) => (
        <div key={comment._id}>
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  );
}
