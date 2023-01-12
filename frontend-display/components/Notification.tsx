import { useState } from "react";
import { cls } from "../utils/cls";
import MainTitle from "./MainTitle";
import PopupTitle from "./PopupTitle";

const alertSvg = (
  <svg
    width="18"
    height="20"
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 0C4.93319 0 1.63638 3.24736 1.63638 7.25317V11.1238L0.0584187 15.0133C-0.0422993 15.2615 -0.0114704 15.5427 0.140744 15.7642C0.292974 15.9855 0.546741 16.1182 0.818181 16.1182H5.72726C5.72726 17.9047 7.18631 19.3418 8.99998 19.3418C10.8137 19.3418 12.2727 17.9047 12.2727 16.1182H17.1818C17.4533 16.1182 17.7071 15.9855 17.8592 15.7642C18.0114 15.5427 18.0423 15.2615 17.9415 15.0133L16.3636 11.1238V7.25317C16.3636 3.24736 13.0668 0 9 0ZM10.6363 16.1182C10.6363 17.0145 9.90991 17.73 8.99998 17.73C8.09005 17.73 7.36362 17.0145 7.36362 16.1182H10.6363ZM3.27274 7.25317C3.27274 4.13753 5.83692 1.61182 9 1.61182C12.1631 1.61182 14.7272 4.13753 14.7272 7.25317V11.2788C14.7272 11.3813 14.747 11.4828 14.7857 11.5779L15.9737 14.5063H2.02624L3.21432 11.5779C3.25291 11.4828 3.27274 11.3813 3.27274 11.2788V7.25317Z"
      fill="#FF5C00"
    />
  </svg>
);

const checkSvg = (type: "orange" | "gray") => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 0C5.59625 0 0 5.59667 0 12.5C0 19.4033 5.59667 25 12.5 25C19.4033 25 25 19.4033 25 12.5C25 5.59667 19.4033 0 12.5 0ZM9.59375 20L9.58542 19.9917L9.57833 20L3.75 14L6.67875 11.015L9.58583 14.0083L18.3358 5.00042L21.25 7.99958L9.59375 20Z"
      fill={type === "gray" ? "#D9D9D9" : "#FF5C00"}
    />
  </svg>
);

interface EachNotifyProps {
  onClick: () => void;
  open: boolean;
  title: string;
  content: string;
  createdAt: string;
}

const EachNotify = (props: EachNotifyProps) => {
  const { title, content, open, onClick, createdAt } = props;
  return (
    <div
      className={cls(
        "flex w-full items-center gap-4 rounded px-8 py-6 shadow-[0px_2.95751px_2.95751px_rgba(0,0,0,0.1)] lg:gap-10",
        open ? "bg-white" : "bg-[#E7E7E7]"
      )}
    >
      <div className="flex w-full flex-col gap-3">
        <div className="w-full text-xs font-semibold text-[#8A8A8A] lg:text-base">
          {createdAt}
        </div>
        <button
          className="w-full text-left text-sm font-bold text-[#505050] lg:text-lg"
          onClick={onClick}
        >
          {title}
        </button>
        {open && (
          <div className="w-full whitespace-pre-wrap text-left text-xs text-[#9F9F9F] lg:text-sm">
            {content}
          </div>
        )}
      </div>
      {checkSvg("orange")}
    </div>
  );
};

export const Notification = () => {
  const [Opened, setOpened] = useState<number | null>(null);
  const eachOnClick = (i: number) => () =>
    setOpened((now) => (now === i ? null : i));
  return (
    <div className="flex h-full w-full flex-col">
      <PopupTitle>알림메시지</PopupTitle>
      <div className="mt-4 flex gap-2 self-center text-base font-bold lg:gap-3 lg:self-start lg:text-lg">
        읽지 않은 알림
        <span className="text-[#FF5C00]">1개</span>
      </div>
      <div className="mt-4 flex w-full flex-col gap-2 overflow-y-auto scrollbar-hide lg:mt-6 lg:gap-4">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <EachNotify
              title="'ㅇㅇㅇㅇㅇ' 여행이 승인되었습니다."
              content={
                "언덕 무엇인지 한 파란 다 잔디가 지나가는 하나에 불러 봅니다. 별을 보고, 별들을 버리었습니다. 소학교 자랑처럼 걱정도 것은 까닭이요, 다 까닭입니다. 당신은 하나에 이 멀리 버리었습니다.\n별빛이 하나에 밤을 릴케 걱정도 가득 무덤 나는 하나에 봅니다. 나의 없이 딴은 애기 있습니다. 불러 된 아름다운 계십니다. 흙으로 북간도에 경, 오는 까닭입니다. 밤을 못 어머니, 다하지 있습니다.언덕 무엇인지 한 파란 다 잔디가 지나가는 하나에 불러 봅니다. 별을 보고, 별들을 버리었습니다. 소학교 자랑처럼 걱정도 것은 까닭이요, 다 까닭입니다. "
              }
              key={i}
              onClick={eachOnClick(i)}
              open={Opened == i}
              createdAt="2022.09.13"
            />
          ))}
      </div>
    </div>
  );
};

export default Notification;
