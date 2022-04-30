import Hero from "./Hero";
import UserPostList from "./UserPostList";

export default function UserPost({ user }) {
  return (
    <div className="flex flex-col h-full">
      {/* <Hero user={user} /> */}
      <UserPostList user={user} />
    </div>
  );
}
