const TagDisplay = (props) => (
  <div className="w-2/3 py-6 max-h-60 min-w-md flex items-center flex-wrap gap-2 text-white">
    {props.tags.map((tag, index) => (
      <div className="bg-[#292F34] inline-block p-2 h-10  hover:bg-[#22272b]">
        <span className="max-h-full">{tag}</span>
      </div>
    ))}
  </div>
);

export default TagDisplay;
