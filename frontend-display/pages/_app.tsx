import "../styles/globals.css";
import type { AppProps } from "next/app";
import TopMenuNavBar from "../components/TopMenuNavBar";
import BottomInfo from "../components/BottomInfo";
import UserStore from "../contexts/UserStore";
import "../public/static/fonts/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/productsPage/modal.css";
import "../components/u11/datepicker.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserStore>
        <TopMenuNavBar />
        <Component {...pageProps} />
        <BottomInfo />
      </UserStore>
    </>
  );
}

export default MyApp;
