import UserPostList from "page-components/UserPost/UserPostList";
import UserProfile from "page-components/UserPost/userProfile";

export default function UserLayout({ children }) {
  return (
    <>
      <Head></Head>
      <Hero />
      <div className="flex"></div>
      <UserProfile user={user} />
      <main className="flex mx-auto">{children}</main>
    </>
  );
}
