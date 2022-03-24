import Image from "next/image";

const Avatar = ({ size, username, url }) => {
  return (
    <div className="container mx-auto bg-gray-100 ">
      <div className="relative flex items-center justify-center max-w-20 max-h-20 border border-gray-600">
        <Image
          className="object-cover"
          src={url || "/default_user.jpg"}
          alt={username}
          width={size}
          height={size}
          quality={100}
          priority="true"
        />
      </div>
    </div>
  );
};

export default Avatar;
