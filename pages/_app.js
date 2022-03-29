import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer />
      </RecoilRoot>
    </SessionProvider>
  );
}
