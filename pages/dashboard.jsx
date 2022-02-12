import { getSession } from "next-auth/react";

import PostForm from "@/components/PostForm";

export default function Dashboard() {
  return (
    <div className="flex justify-center  items-center h-10 h-screen">
      <PostForm />
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }

// export default Dashboard;
