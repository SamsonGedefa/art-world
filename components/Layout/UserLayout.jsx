import UserPostList from "page-components/UserPost/UserPostList";
import UserProfile from "page-components/UserPost/userProfile";
import Head from "next/head";
import Hero from "@/page-components/UserPost/Hero";
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
