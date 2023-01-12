import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { cls } from "../utils/cls";
import { getNavInfo } from "../utils/NavInfo";
import useLogin, { loginType, useSetLogin } from "../utils/useLogin";
import usePopup from "../utils/usePopup";
import Notification from "./Notification";

interface MainNavBarProps {
  type: loginType;
}

const AlertSvg = (isOn: boolean) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 33 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.3671 0.597656C9.22508 0.597656 3.43529 6.30059 3.43529 13.3355V20.133L0.664117 26.9636C0.487238 27.3995 0.541379 27.8935 0.808695 28.2824C1.07604 28.671 1.5217 28.904 1.99839 28.904H10.6196C10.6196 32.0415 13.182 34.5653 16.3671 34.5653C19.5522 34.5653 22.1146 32.0415 22.1146 28.904H30.7358C31.2126 28.904 31.6583 28.671 31.9255 28.2824C32.1928 27.8935 32.2471 27.3995 32.0701 26.9636L29.2989 20.133V13.3355C29.2989 6.30059 23.5092 0.597656 16.3671 0.597656ZM19.2408 28.904C19.2408 30.4781 17.9651 31.7346 16.3671 31.7346C14.7691 31.7346 13.4934 30.4781 13.4934 28.904H19.2408ZM6.30903 13.3355C6.30903 7.86389 10.8122 3.42829 16.3671 3.42829C21.922 3.42829 26.4252 7.86389 26.4252 13.3355V20.4053C26.4252 20.5852 26.46 20.7635 26.5278 20.9305L28.6141 26.0734H4.11996L6.20644 20.9305C6.2742 20.7635 6.30903 20.5852 6.30903 20.4053V13.3355Z"
      fill={isOn ? "#FF5C00" : "#2D2D2D"}
    />
  </svg>
);

const searchSvg = (
  <svg
    width="22"
    height="23"
    viewBox="0 0 22 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.6635 15.0777C17.7893 11.8571 17.7893 6.63594 14.6635 3.4154C11.5376 0.194865 6.47002 0.194865 3.3442 3.4154C0.218388 6.63594 0.218388 11.8571 3.3442 15.0777C6.47002 18.2982 11.5376 18.2982 14.6635 15.0777V15.0777Z"
      stroke="#A5A5A5"
      strokeWidth="1.77882"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.6635 15.0777C17.7893 11.8571 17.7893 6.63594 14.6635 3.4154C11.5376 0.194865 6.47002 0.194865 3.3442 3.4154C0.218388 6.63594 0.218388 11.8571 3.3442 15.0777C6.47002 18.2982 11.5376 18.2982 14.6635 15.0777V15.0777Z"
      stroke="#A5A5A5"
      strokeWidth="1.77882"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.1361 15.5664L21 21.608"
      stroke="#A5A5A5"
      strokeWidth="1.77882"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const triangleSvg = (isGray?: boolean) => (
  <svg
    width="6"
    height="8"
    viewBox="0 0 6 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.89815 3.87869C5.05973 3.99864 5.05973 4.24052 4.89815 4.36047L0.841745 7.37156C0.643792 7.51851 0.362933 7.37721 0.362933 7.13068L0.362933 1.10848C0.362933 0.861951 0.643792 0.720653 0.841745 0.867596L4.89815 3.87869Z"
      fill={isGray ? "#767676" : "#00192F"}
    />
  </svg>
);

export const MainNavBar = (props: MainNavBarProps) => {
  const { type } = props;
  const { openPopup, component } = usePopup();
  const router = useRouter();
  const [Selected, setSelected] = useState(-1);
  const [HaveAlert, setHaveAlert] = useState(true);
  const navBarInfo = getNavInfo(type);
  const setLogin = useSetLogin();
  const { loginData } = useLogin();
  const roleList = loginData.login ? loginData.info.group?.role || [] : [];
  const checkThisPage = (code: string) =>
    router.pathname.startsWith(`/${type}/${code}`);
  const checkThisSub = (code: string, subCode: string) =>
    router.pathname.startsWith(`/${type}/${code}${subCode}`);
  const openAlert = () => openPopup(<Notification />);
  const selectHandler = (i: number) => setSelected(i);
  const isInPermission = (permission: string | undefined | null) => {
    if (!permission) return true;
    const result = roleList
      .map((t) => {
        const target = t.rolePolicy.find((a) => a.code === permission);
        if (!target) return false;
        return target.canAccess || target.canApprove || target.canUpdate;
      })
      .reduce((prev, curr) => prev || curr, false);
    return result;
  };
  useEffect(() => {
    navBarInfo.map((v, i) => {
      checkThisPage(v.code) && selectHandler(i);
    });
  }, []);
  return (
    <div className="w-full h-full flex flex-col items-center gap-6 py-8 relative">
      {component}
      <div className="absolute top-8 left-8 flex flex-col gap-4 items-center">
        <button className="relative" onClick={openAlert}>
          {AlertSvg(HaveAlert)}
          {HaveAlert && (
            <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#FF5C00]" />
          )}
        </button>
        <button className="relative">{searchSvg}</button>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className=" w-16 h-16 rounded-full overflow-hidden relative">
          <Image
            src="/images/tmp/temp.png"
            alt="프로필 이미지"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="font-semibold text-xl text-[#2D2D2D]">
          {loginData.login ? loginData.info.name : ""}
        </div>
      </div>
      <div className="w-full h-full flex flex-col overflow-y-auto pl-1 scrollbar-hide">
        {navBarInfo.map(
          ({ name, code, icon, sub = [], permission }, index) =>
            isInPermission(permission) && (
              <div
                key={`${name}${code}`}
                className="flex w-full flex-col justify-center items-center"
              >
                <button
                  className={cls(
                    "w-full py-2 pl-6 text-sm cursor-pointer flex gap-3 items-center border-l-[5px]",
                    checkThisPage(code)
                      ? "border-[#00192F] bg-[#FAFAFA]"
                      : "border-transparent"
                  )}
                  type="button"
                  onClick={() => selectHandler(index)}
                >
                  <div className="w-[20px] h-[20px] flex justify-center items-center smallSvg">
                    {icon}
                  </div>
                  {name}
                </button>
                <div
                  className={cls(
                    "w-full flex-col gap-2 pl-10 pt-2 pb-4",
                    Selected === index ? "flex" : "hidden"
                  )}
                >
                  {sub.map((s, i) => (
                    <Link
                      href={`/${type}/${code}${s.code}`}
                      key={`${name}${code}${s.code}${i}`}
                    >
                      <div
                        className={cls(
                          "w-full flex gap-3 items-center text-sm hover:cursor-pointer",
                          checkThisSub(code, s.code)
                            ? "text-[#00192F]"
                            : "text-[#979797]"
                        )}
                      >
                        {triangleSvg(!checkThisSub(code, s.code))}
                        {s.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
      <button
        className=" self-start px-8 text-[#747474]"
        onClick={() => {
          setLogin();
          router.push("/login");
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MainNavBar;
