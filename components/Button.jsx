const Button = ({ size, username, url }) => {
  return (
    <div className="container mx-auto bg-gray-100 ">
      <button className="bg-[#e65a5a] text-white rounded-xl px-4 py-1.5 font-bold shadow-md hover:bg-[#ce3131] disabled:hover:bg-[#ce3131] disabled:opacity-50 disabled:cursor-default">
        Comment
      </button>
    </div>
  );
};

export default Button;
