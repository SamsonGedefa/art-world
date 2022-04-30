import { atom } from "recoil";

export const likeUnlikeState = atom({
  key: "currentLikeState",
  default: [],
});
