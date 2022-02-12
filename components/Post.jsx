import React from "react";
function Post() {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg my-2 border">
      <img
        className="w-full"
        src="https://tailwindcss.com/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4 border-t">
        <div className="font-bold text-xl mb-2"></div>
        <p className="text-white text-base">Our first test product!</p>
      </div>
    </div>
  );
}

export default Post;
