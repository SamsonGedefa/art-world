export default function SinglePost({ post }) {
  return (
    <div className="flex justify-center items-center w-2/4 h-[700px]  bg-gradient-to-b from-[#171720] to-[#06070D]">
      <div className="w-3/4 h-3/4  ">
        <img
          className=" max-w-full h-full  group-hover:opacity-70"
          src={post.images}
          alt="Sunset in the mountains"
        />
      </div>
    </div>
  );
}
