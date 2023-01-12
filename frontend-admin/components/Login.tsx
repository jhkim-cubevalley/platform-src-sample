import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import LoginInput from "./LoginInput";
import { useSetLogin, useLogin } from "../utils/useLogin";
import { useRouter } from "next/router";
import { loginScreenName, useLoginRouter } from "../pages/login";
import LoginContainer from "./LoginContainer";
import CustomSelect from "./CustomSelect";
import axios from "axios";
import { loginAPI } from "../utils/api/auth";
import { usePageType } from "../utils/pageType";
import { openGlobalTextPopup } from "../utils/globalPopup";

const alertSvg = (
  <svg
    width="19"
    height="22"
    viewBox="0 0 19 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="9.44165" cy="12.148" r="9.44165" fill="#FF5C00" />
    <path
      d="M8.74221 14.0829H10.1367L10.4417 8.72284L10.5144 6.70374H8.36453L8.43716 8.72284L8.74221 14.0829ZM9.43945 17.9468C10.1948 17.9468 10.7758 17.3367 10.7758 16.5523C10.7758 15.7534 10.1948 15.1578 9.43945 15.1578C8.6841 15.1578 8.11759 15.7534 8.11759 16.5523C8.11759 17.3367 8.6841 17.9468 9.43945 17.9468Z"
      fill="white"
    />
  </svg>
);

export const Login = () => {
  const [Valid, setValid] = useState(true);
  const { t } = useTranslation("common");
  const setLogin = useSetLogin();
  const pageType = usePageType();
  const router = useRouter();
  const loginRouter = useLoginRouter();
  return (
    <LoginContainer>
      <div className="w-full h-9 relative mb-20">
        <Image
          src="/images/tmp/logo.png"
          alt={t("cubelogo")}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(axios.defaults);
          const id = (e.target as any)[0].value;
          const pw = (e.target as any)[1].value;
          const type = pageType;
          console.log({ id, pw, type });
          const data = await loginAPI(id, pw, type);
          if ("error" in data) {
            openGlobalTextPopup(data.message);
          } else {
            setLogin({ type, token: data.result.accessToken });
          }
        }}
      >
        <LoginInput
          type="text"
          placeholder={t("id")}
          required
          invalid={!Valid}
          forLogin
        />
        <LoginInput
          type="password"
          placeholder={t("password")}
          required
          invalid={!Valid}
          forLogin
        />
        {!Valid && (
          <div className="w-full flex justify-start items-center gap-2 text-[#FF5C00] text-[15px]">
            {alertSvg} {t("logincheckinput")}
          </div>
        )}
        <LoginButton className="mt-10">{t("login")}</LoginButton>
      </form>
      <div className="mt-8 flex divide-x divide-[#C9C9C9]">
        {pageType === "cubeez" && (
          <>
            <button
              className="text-[#8D8D8D] px-2.5"
              onClick={() => loginRouter(loginScreenName.findid)}
            >
              {t("findid")}
            </button>
            <button
              className="text-[#8D8D8D] px-2.5 cursor-pointer"
              onClick={() => loginRouter(loginScreenName.findpw)}
            >
              {t("findpw")}
            </button>
            {pageType === "cubeez" && (
              <button
                className="text-[#8D8D8D] px-2.5 cursor-pointer font-bold"
                onClick={() => loginRouter(loginScreenName.signup)}
              >
                {t("signup")}
              </button>
            )}
          </>
        )}
      </div>
    </LoginContainer>
  );
};
