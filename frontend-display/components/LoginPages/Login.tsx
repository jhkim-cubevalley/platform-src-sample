import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";
import { loginAPI } from "../../utils/api/auth";
import { useSetLogin } from "../../utils/useLogin";
import GapMaker from "../GapMaker";
import LoginInput from "../LoginInput";
import MainButton from "../MainButton";
import PopupTitle from "../PopupTitle";
import { loginPopupChanger } from "../useLoginPopup";
import FindID from "./FindID";
import FindPW from "./FindPW";
import Register from "./Register";

export const Login = ({ openPopup }: loginPopupChanger) => {
  const setLogin = useSetLogin();
  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = (e.target as any)[0].value;
    const pw = (e.target as any)[1].value;
    const result = await loginAPI(id, pw);
    if ("error" in result) {
      alert(result.message);
      return;
    }
    setLogin({ token: result.result.accessToken });
    openPopup(null);
    // alert("로그인에 성공하였습니다.");
  };
  return (
    <div className="flex w-full flex-col">
      <div className="relative mb-8 h-8 w-full lg:hidden">
        <Image
          src="/images/tmp/logo.png"
          alt="큐브밸리 로고"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <PopupTitle className="mb-8 lg:mb-12">
        설레는 여행을 함께 할{"\n"}큐브밸리에 오신 것을 환영합니다.
      </PopupTitle>
      <form className="flex w-full flex-col gap-3" onSubmit={loginHandler}>
        <LoginInput placeholder="아이디" type="email" required />
        <LoginInput placeholder="패스워드" type="password" required />
        <MainButton styleType="black" className="mt-4 lg:mt-8">
          로그인
        </MainButton>
      </form>
      <div className="mt-6 mb-20 flex w-full justify-center divide-x">
        <button
          className="px-2 text-[13px] text-[#8D8D8D] lg:px-3 lg:text-base"
          onClick={() => openPopup(<FindID openPopup={openPopup} />)}
        >
          아이디 찾기
        </button>
        <button
          className="px-2 text-[13px] text-[#8D8D8D] lg:px-3 lg:text-base"
          onClick={() => openPopup(<FindPW openPopup={openPopup} />)}
        >
          패스워드 찾기
        </button>
        <button
          className="px-2 text-[13px] font-bold text-[#8D8D8D] lg:px-3 lg:text-base"
          onClick={() => openPopup(<Register openPopup={openPopup} />)}
        >
          회원가입
        </button>
      </div>
      <Link href="/api/auth/social/kakao">
        <MainButton
          styleType="white"
          className="mb-5 flex items-center justify-center gap-2 lg:gap-4"
        >
          <div className="relative h-8 w-8 lg:h-10 lg:w-10">
            <Image
              src="/images/tmp/kakao.png"
              alt="카카오 로그인"
              layout="fill"
              objectFit="contain"
            />
          </div>
          카카오 로그인
        </MainButton>
      </Link>

      <Link href="/api/auth/social/naver">
        <MainButton
          styleType="white"
          className="mb-5 flex items-center justify-center gap-2 lg:gap-4"
        >
          <div className="relative h-8 w-8 lg:h-10 lg:w-10">
            <Image
              src="/images/tmp/naver.png"
              alt="네이버 로그인"
              layout="fill"
              objectFit="contain"
            />
          </div>
          네이버 로그인
        </MainButton>
      </Link>
    </div>
  );
};

export default Login;
