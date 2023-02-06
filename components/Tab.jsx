import Link from "next/link";
import { useRouter } from "next/router";
import { navMenuState } from "../atoms/navMenuAtom";
import { useRecoilState } from "recoil";

function Tab({ href, text, Icon, isSelected }) {
  const [menuOpen, setMenuOpen] = useRecoilState(navMenuState);

  const router = useRouter();
  return (
    <nav className="text-white w-full">
      <ul>
        <li className="" key={text}>
          <Link href={href}>
            <a
              className={`text-[#d9d9d9] flex h-12 space-x-3 ${
                menuOpen && "pl-7 justify-start"
              } items-center ${
                !menuOpen && "justify-center"
              } text-xl  hover:bg-[#22272B] cursor-pointer ${
                router.asPath === href && "bg-[#22272B]"
              }`}
            >
              <Icon
                className={`h-7  ${router.asPath === href && "text-[#11EE8F]"}`}
              />
              <span
                className={` ${!menuOpen && "hidden "}  inline text-gray-600`}
              >
                {text}
              </span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Tab;
