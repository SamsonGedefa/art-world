import Link from "next/link";
import Button from "./Post-Interactions/Button";
import { AiOutlineSearch } from 'react-icons/ai';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { searchState } from "@/atoms/searchAtom";
import { useState } from "react";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("")
  const setSearchState = useSetRecoilState(searchState);

  const addSearchTerm = (event) => {
    event.preventDefault();
    setSearchState(searchValue);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setSearchState(searchValue);
    setSearchValue('');
  };

  const onChange = ({target: {value}}) => {
    setSearchValue(value);
    console.log(searchValue)
  };

  return (
    <div>
      <form className="p-5 justify-evenly">
        <input className="text-black" type="text" placeholder="Enter your thing" value={searchValue} onChange={onChange}/>
        <button
          onClick={onSubmit}
          className="bg-[#5d3]  text-black rounded-xl px-4 py-1.5 font-bold shadow-md hover:bg-[#47f093]"
        >
          Search
        </button>
        <button
          onClick={onSubmit}
          className="bg-[#5d5e] text-white rounded-xl px-4 py-1.5 font-bold shadow-md hover:bg-[#47f093]"
        >
          Clear Search
        </button>
      </form>
    </div>

  )
}



