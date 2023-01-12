import { useState } from "react";
import useSWR from "swr";
import { secondArgsFetcher } from "../utils/api";
import { historyI } from "../utils/api/event";
import { compareDate, formatDate } from "../utils/formatDate";
import MainTitle from "./MainTitle";

export const History = (
  props:
    | { historyList: historyI[] }
    | {
        id: string | number;
        fetcher: (id: string | number) => Promise<historyI[]>;
      }
) => {
  let historyList: historyI[] = [];
  if ("historyList" in props) historyList = props.historyList;
  const { data } = useSWR(
    "id" in props && ["/product/history", props.id],
    "fetcher" in props ? secondArgsFetcher(props.fetcher) : null
  );
  if (data) historyList = data;
  const [Selected, setSelected] = useState(-1);
  const selectHandler = (i: number) => () =>
    setSelected((now) => (now === i ? -1 : i));
  const dummyList: historyI[] = [
    {
      id: "asdf",
      title: "행사가 종료되었습니다.",
      message: "작성시 기재한 메시지입니다. 작성시 기재한 메시지입니다.",
      createdAt: "2022-11-11",
      updatedAt: "",
    },
    {
      id: "asdf",
      title: "행사가 종료되었습니다.",
      message: "작성시 기재한 메시지입니다. 작성시 기재한 메시지입니다.",
      createdAt: "2022-11-11",
      updatedAt: "",
    },
    {
      id: "asdf",
      title: "승인되었습니다. 곧 상품 전시가 될 예정입니다.",
      message: "작성시 기재한 메시지입니다. 작성시 기재한 메시지입니다.",
      createdAt: "2022-11-11",
      updatedAt: "",
    },
    {
      id: "asdf",
      title: "행사가 종료되었습니다.",
      message: null,
      createdAt: "2022-11-11",
      updatedAt: "",
    },
    {
      id: "asdf",
      title: "행사가 종료되었습니다.",
      message: "작성시 기재한 메시지입니다. 작성시 기재한 메시지입니다.",
      createdAt: "2022-11-11",
      updatedAt: "",
    },
    {
      id: "asdf",
      title: "행사가 종료되었습니다.",
      message: "작성시 기재한 메시지입니다. 작성시 기재한 메시지입니다.",
      createdAt: "2022-11-11",
      updatedAt: "",
    },
    {
      id: "asdf",
      title: "행사가 종료되었습니다.",
      message: "작성시 기재한 메시지입니다. 작성시 기재한 메시지입니다.",
      createdAt: "2022-11-11",
      updatedAt: "",
    },
  ];
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <MainTitle>히스토리</MainTitle>
      <div className="w-full flex flex-col gap-4 max-h-[50vh] overflow-y-auto pr-2">
        {historyList
          .sort((a, b) => compareDate(b.createdAt, a.createdAt))
          .map((t, i) => (
            <div key={i} className="w-full flex gap-4">
              <div className="w-6 h-6 flex-shrink-0 rounded-full bg-[#D9D9D9]"></div>
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex justify-between items-center">
                  <div className="text-sm">{formatDate(t.createdAt)}</div>
                  {t.message ? (
                    <button
                      className="text-[10px] font-light"
                      onClick={selectHandler(i)}
                    >
                      {Selected === i ? "메시지 닫기" : "메시지 열기"}
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="font-bold">{t.title}</div>
                {Selected === i && t.message && (
                  <div className="w-full p-4 bg-white text-sm">{t.message}</div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
