import { atom } from "recoil";

// export const likeUnlikeState = atom({
//   key: "likeUnlikeState",
//   default: false,
// });

// const localStorageEffect =
//   (key) =>
//   ({ setSelf, onSet }) => {
//     if (typeof window !== "undefined") {
//       const savedValue = localStorage.getItem(key);
//       if (savedValue != null) {
//         setSelf(JSON.parse(savedValue));
//       }
//     }

//     onSet((newValue, _, isReset) => {
//       if (typeof window !== "undefined") {
//         isReset
//           ? localStorage.removeItem(key)
//           : localStorage.setItem(key, JSON.stringify(newValue));
//       }
//     });
//   };

export const likeUnlikeState = atom({
  key: "currentLikeState",
  default: [],
});
