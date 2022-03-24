import { AiFillStar } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
export default function PostFigures() {
  return (
    <div className="flex w-2/3 h-10">
      <div className="flex gap-5 text-gray-600">
        <AiFillStar size={20} />
        <FaCommentAlt size={20} />
      </div>
    </div>
  );
}
