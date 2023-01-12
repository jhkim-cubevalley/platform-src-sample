import Image from "next/image";
import { useRouter } from "next/router";
import MainButton from "../MainButton";
import { loginPopupChanger } from "../useLoginPopup";

interface RegisterFinishProps extends loginPopupChanger {
  name: string;
}

export const RegisterFinish = (props: RegisterFinishProps) => {
  const { name, openPopup } = props;
  const router = useRouter();
  return (
    <div className="flex w-full flex-col">
      <div className="relative mb-8 h-8 w-full">
        <Image
          src="/images/tmp/logo.png"
          alt="큐브밸리 로고"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="mt-10 flex w-full items-center justify-center text-[22px] font-bold lg:text-[35px]">
        {name}님 환영합니다.
      </div>
      <div className="mt-10 flex w-full items-center justify-center whitespace-pre-wrap text-center text-[18px] lg:text-[25px]">
        회원이 되신 것을 축하합니다.{"\n"}이제 설레는 여행을 만나러 가볼까요?
      </div>
      <div className="mt-20 flex w-full flex-col gap-3">
        {/* <MainButton styleType="black">여행 추천받으러 가기</MainButton> */}
        <MainButton styleType="white" onClick={() => router.reload()}>
          홈으로
        </MainButton>
      </div>
    </div>
  );
};
