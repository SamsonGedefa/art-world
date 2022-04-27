import { createContext } from "react";
import { likeMachine } from "./likeState";
import { useInterpret } from "@xstate/react";

export const GlobalStateContext = createContext({});

// export const GlobalStateProvider = (props) => {
//   const likeService = useInterpret(likeMachine);

//   return (
//     <GlobalStateContext.Provider value={{ likeService }}>
//       {props.children}
//     </GlobalStateContext.Provider>
//   );
// };
