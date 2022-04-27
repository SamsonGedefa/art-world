import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { byUserLiked } from "@/atoms/likeAtom";
function getStorageValue(key, defaultValue) {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial;
  }
}

export const useLocalStorage = (key, defaultValue) => {

  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};



/**
 *
 * User Id
 * Make api call to get all post liked by a user
 * store array in local storage
 *
 * load the array in state in useEffect
 *
 * When user like or dislike a post
 * Update local state
 * Update local storage
 * Update database
 *
 */
