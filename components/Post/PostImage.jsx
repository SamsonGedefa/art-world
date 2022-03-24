import Image from "next/image";

export function PostImage({ post }) {
  return (
    <ul className="flex flex-wrap">
      <li className="h-20 flex-grow">
        <Image
          src={post.Images}
          layout="responsive"
          objectFit="cover"
          className="align-bottom"
        />
      </li>
    </ul>
  );
}
