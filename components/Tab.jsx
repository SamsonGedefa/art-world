import Link from "next/link";
function Tab({ href, text, Icon, isSelected }) {
  return (
    <div>
      <Link replace href={href}>
        <a className="text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation">
          <Icon className="h-7" />
          <span className="hidden xl:inline ">{text}</span>
        </a>
      </Link>
    </div>
  );
}

export default Tab;
