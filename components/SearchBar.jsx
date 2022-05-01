
import { AiOutlineSearch, AiOutlineClear } from 'react-icons/ai';
import { FaSearchMinus } from "react-icons/fa";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { searchState } from "@/atoms/searchAtom";
import { useState } from "react";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("")
  const setSearchState = useSetRecoilState(searchState);
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  const onSubmit = (event) => {
    event.preventDefault();
    setSearchState(capitalize(searchValue));
    setSearchValue('');
  };

  const onChange = ({target: {value}}) => {
    setSearchValue(value);
    console.log(searchValue)
  };

  return (
    <div className="p-2">
      <form className="justify-evenly p-2">
        <input className="text-black rounded-md p-1 mr-2" type="text" placeholder="Search some art" value={searchValue} onChange={onChange}/>
          <button
            onClick={onSubmit}
            className="bg-[#95bca7]  text-white rounded-sm px-4 py-1.5 font-bold shadow-md hover:bg-[#47f093]"

          >
            <AiOutlineSearch size={16} className="" />
          </button>

        <button
          onClick={onSubmit}
          className="border ml-2 text-white rounded-sm px-4 py-1.5 font-bold shadow-md hover:bg-[#DC143C]"
        >
            <FaSearchMinus size={15} className="" /> 
        </button>
      </form>
    </div>

  )
}



