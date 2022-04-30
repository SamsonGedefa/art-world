import Image from "next/image";
export default function Hero({ user }) {
  return (
    <div className="relative w-full h-80 text-white">
      {/* <div className="w-screen h-80 fixed overflow-hidden"> */}
      <Image
        src={"/user_user.jpg"}
        layout="fill"
        objectFit="cover"
        quality={100}
        objectPosition="center"
      />
      {/* </div> */}

      <div className="absolute bottom-0 left-0 flex px-4">
        <div className="flex items-center justify-center w-28 h-28 hoverAnimation border">
          <Image src="/default_user.jpg" width={70} height={70} />
        </div>

        <div className="font-semibold text-xl px-3">{user.username}</div>
      </div>
    </div>
  );
}
