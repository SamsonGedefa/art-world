import Head from "next/head";
import { Layout } from "../components/Layout";
import Profile from "../page-components/Profile";
import { getSession, useSession } from "next-auth/react";
import { findUserByUsername } from "@/lib/db/user";

export default function Profiles({user}) {
  const { data: session, status } = useSession()
  if (status === "authenticated") {
    return (
        <div>
            <Head />
            <Profile user={user}/>
        </div>
    )
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const user = await findUserByUsername(session.user.username);
  
  if (!user) {
    return {
      props: {
        user
      }
    }
  }
  return {
    props: {
      user : {
        _id : String(user._id),
        email : user.email,
        username: user.username,
        bio: user.bio,
        avatar: user.profilePicture
      }
    }
  }
}

Profiles.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
