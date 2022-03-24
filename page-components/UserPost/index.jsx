import Hero from "./Hero";
import UserPostList from "./UserPostList";
import UserProfile from "./UserProfile";

export default function UserPost({ user }) {
  return (
    <div className="flex flex-col">
      <Hero user={user} />
      <UserPostList user={user} />
      {/* <div className="grid grid-cols-2 w-full h-full">
        <div className="max-w-1/5 bg-black">
          <UserProfile user={user} />
        </div>
        <div className="">
          <UserPostList user={user} />
        </div>
      </div> */}
    </div>
  );
}
