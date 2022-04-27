import "../styles/globals.css";
import React, { useContext } from "react";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
import { GlobalStateContext, GlobalStateProvider } from "machines/contexts";
import { likeMachine } from "machines/likeState";
import { useInterpret, useMachine } from "@xstate/react";

const STORAGE_KEY = "myPersistedState";

let serializedState;
if (typeof window !== "undefined") {
  serializedState =
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || likeMachine.initialState;
}

// let previousState;

// if (serializedState) {
//   previousState = JSON.parse(serializedState);
//   console.error("previousState", previousState);
// }

export default function MyApp({ Component, pageProps, user }) {
  const getLayout = Component.getLayout || ((page) => page);

  const likeService = useInterpret(likeMachine)
    .onTransition((state) => {
      console.log("--Init-----", state);
      if (state.changed) {
        console.log("--Set-----", state.value);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    })
    .start(serializedState);

  return (
    <SessionProvider session={pageProps.session}>
      <GlobalStateContext.Provider value={{ likeService }}>
        <RecoilRoot>
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer />
        </RecoilRoot>
      </GlobalStateContext.Provider>
    </SessionProvider>
  );
}

// return (
//   <SessionProvider session={pageProps.session}>
//     <RecoilRoot>
//       {getLayout(<Component {...pageProps} />)}
//       <ToastContainer />
//     </RecoilRoot>
//   </SessionProvider>
// );
// }
