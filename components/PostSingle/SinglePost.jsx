export default function SinglePost({ post }) {
  return (
    <div className="flex justify-center items-center w-3/4 h-[700px]  bg-gradient-to-b from-[#171720] to-[#06070D]">
      <div className="flex justify-center items-center w-3/4 h-3/4">
        <img
          className=" max-w-full h-full  group-hover:opacity-70"
          src={post.images}
          alt={post.content}
        />
      </div>
    </div>
  );
}
