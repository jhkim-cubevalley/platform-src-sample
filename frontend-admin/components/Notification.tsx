import {
  ChangeEvent,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import LoginContainer from "./LoginContainer";
import MainTitle from "./MainTitle";
import { io } from "socket.io-client";
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
}

const EachNotify = (props: EachNotifyProps) => {
  const { title, content, open, onClick } = props;
  return (
    <div className="bg-white flex flex-col rounded">
      <button
        onClick={onClick}
        type="button"
        className="w-full px-6 py-4 flex justify-between items-center text-[17px] font-bold text-[#00192F]"
      >
        {title}
        {checkSvg("orange")}
      </button>
      {open && (
        <>
          <div className="w-full h-[1px] bg-[#D9D9D9] mb-4" />
          <div className="w-full text-sm text-[#00192F] font-normal whitespace-pre-wrap px-6 pb-4">
            {content}
          </div>
        </>
      )}
    </div>
  );
};

export interface IMessage {
  type: string;
  payload: {};
}

// export const socketContext = createContext(socket);

// const socket = io("/chat");
export const Notification = () => {
  // const [isConnected, setIsConnected] = useState(socket.connected);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     setIsConnected(true);
  //   });
  //   socket.on("disconnect", () => {
  //     setIsConnected(false);
  //   });
  // }, []);

  const [Opened, setOpened] = useState<number | null>(null);
  const eachOnClick = (i: number) => () =>
    setOpened((now) => (now === i ? null : i));

  // const [alertMessage, setAlertMessage] = useState<IMessage[]>([]);
  // const [message, setMessage] = useState<string>("");
  // const chatContainerEI = useRef(null);
  // useEffect(() => {
  //   const socket = SocketIOClient;
  //   // const messageHandler = (chat: IChat) =>
  //   //   setChats((prevChats) => [...prevChats, chat]);
  //   // socket.on("message", messageHandler);

  //   // return () => {
  //   //   socket.off("message", messageHandler);
  //   // };
  // }, []);

  return (
    <LoginContainer>
      <MainTitle>
        <div className="w-full flex items-center gap-3 justify-start">
          {alertSvg}알림메시지
        </div>
        <div className="w-full flex flex-col max-h-[50vh] overflow-y-auto scrollbar-hide gap-3 mt-6">
          {/* {chats.map((chat, i) => (
            // Array(10)
            // .fill(0)
            <EachNotify
              title="'ㅇㅇㅇㅇㅇ' 여행이 승인되었습니다."
              content={
                "언덕 무엇인지 한 파란 다 잔디가 지나가는 하나에 불러 봅니다. 별을 보고, 별들을 버리었습니다. 소학교 자랑처럼 걱정도 것은 까닭이요, 다 까닭입니다. 당신은 하나에 이 멀리 버리었습니다.\n별빛이 하나에 밤을 릴케 걱정도 가득 무덤 나는 하나에 봅니다. 나의 없이 딴은 애기 있습니다. 불러 된 아름다운 계십니다. 흙으로 북간도에 경, 오는 까닭입니다. 밤을 못 어머니, 다하지 있습니다.언덕 무엇인지 한 파란 다 잔디가 지나가는 하나에 불러 봅니다. 별을 보고, 별들을 버리었습니다. 소학교 자랑처럼 걱정도 것은 까닭이요, 다 까닭입니다. "
              }
              key={i}
              onClick={eachOnClick(i)}
              open={Opened == i}
            />
          ))} */}
        </div>
      </MainTitle>
    </LoginContainer>
  );
};

export default Notification;
