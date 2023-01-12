import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import useLogin, { useSetLogin } from "../utils/useLogin";
import useLoginPopup from "./useLoginPopup";
import useMobileMenu from "./useMobileMenu";
import usePopup from "./usePopup";

const menuSvg = (
  <svg
    width="25"
    height="20"
    viewBox="0 0 25 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.834961 1.12402H24.0408"
      stroke="white"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path
      d="M0.834961 10.1643H24.0408"
      stroke="white"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path
      d="M0.834961 19.2046H24.0408"
      stroke="white"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const searchSvg = (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.2585 11.5456C13.4978 9.23844 13.4978 5.49801 11.2585 3.19083C9.01918 0.883655 5.38876 0.883655 3.14944 3.19083C0.910123 5.49801 0.910123 9.23844 3.14944 11.5456C5.38876 13.8528 9.01918 13.8528 11.2585 11.5456V11.5456Z"
      stroke="white"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.2585 11.5456C13.4978 9.23844 13.4978 5.49801 11.2585 3.19083C9.01918 0.883655 5.38876 0.883655 3.14944 3.19083C0.910123 5.49801 0.910123 9.23844 3.14944 11.5456C5.38876 13.8528 9.01918 13.8528 11.2585 11.5456V11.5456Z"
      stroke="white"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.597 11.8955L15.7979 16.2237"
      stroke="white"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TopSearchBar = () => {
  const { t } = useTranslation("common");
  const { component, setOpen } = useMobileMenu();
  const { component: loginPopup, openLogin } = useLoginPopup();
  const { loginData } = useLogin();
  const setLogin = useSetLogin;
  return (
    <div className="absolute top-0 z-10 flex h-16 w-full items-center justify-between bg-[#000000] bg-opacity-60 px-6 lg:hidden">
      {loginPopup}
      <button onClick={() => setOpen(true)}>{menuSvg}</button>
      <div className="flex h-full items-center gap-5">
        {/* <div className="relative h-full w-[100px] bg-opacity-20">
          <Image
            src={"/images/tmp/logo.png"}
            alt="큐브밸리 로고"
            layout="fill"
            objectFit="contain"
            objectPosition="left"
          />
        </div> */}
        {/* <form className="relative">
          <input
            className="h-8 w-48 rounded-full bg-white bg-opacity-30 pl-4 pr-9 text-white focus:outline-none"
            type="text"
          />
          <button
            type="submit"
            className="absolute top-0 right-4 flex h-full items-center justify-center"
          >
            {searchSvg}
          </button>
        </form> */}
        {/* <button
          className="text-xs font-bold text-white"
          onClick={loginData.login ? () => setLogin() : openLogin}
        >
          {loginData.login ? "로그아웃" : "로그인"}
        </button> */}
      </div>
      {component}
    </div>
  );
};

export default TopSearchBar;
