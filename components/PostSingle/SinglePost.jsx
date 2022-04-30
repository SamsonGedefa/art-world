export default function SinglePost({ post }) {
  return (
    <div className="flex justify-center items-center overflow-hidden w-3/4 2xl:h-[700px] xl:h-[700px]  sm:h-[500px] md:h-[600px] bg-gradient-to-b from-[#171720] to-[#06070D]">
      <div className="flex justify-center items-center max-w-3/4 max-h-full">
        <img
          className=" max-w-full max-h-full  group-hover:opacity-70"
          src={post.images}
          alt={post.content}
        />
      </div>
    </div>
  );
}
