import Head from "next/head";
import Image from "next/image";
import Feed from "@/components/Feed";

// import { connectToDatabase } from "@/lib/middleware/database";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home / Art-World</title>
      </Head>

      <Feed />
    </>
  );
}

// export async function getServerSideProps(contex) {
//   const { db } = await connectToDatabase();

//   const data = await db.collection("product").findOne({});

//   // console.log(data);

//   return {
//     props: {
//       data: JSON.parse(JSON.stringify(data)),
//     },
//   };
// }
