import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
import { GlobalStateContext } from "machines/contexts";
import { likeMachine } from "machines/likeState";
import { useInterpret } from "@xstate/react";

const STORAGE_KEY = "likedPersistedState";

let previousState;
if (typeof window !== "undefined") {
  previousState =
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || likeMachine.initialState;
}

export default function MyApp({ Component, pageProps, user }) {
  const getLayout = Component.getLayout || ((page) => page);

  // Restores persisted like state on page load
  const likeService = useInterpret(likeMachine)
    .onTransition((state) => {
      if (state.changed) {
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
      }
    })
    .start(previousState);

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
