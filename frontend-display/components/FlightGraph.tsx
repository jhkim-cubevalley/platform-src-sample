import { cls } from "../utils/cls";
import { useIsPC } from "../utils/useIsPC";

export interface flightPlace {
  date: string;
  time: string;
  name: string;
  code: string;
  info: string;
}

export interface flightMove {
  code: string;
  time: string;
  company?: string;
}

export interface flightWait {
  time: string;
}

export type flightMiddle = flightMove | flightWait;

function isMove(middle: flightMiddle): middle is flightMove {
  return "code" in middle;
}

export interface flightInfoI {
  place: flightPlace[];
  middle: flightMiddle[];
}

const useChangingStyle = () => {
  const isPC = useIsPC();
  return (
    timeStart: number,
    timeEnd: number,
    pcRow: number,
    mobileRow: number
  ) =>
    isPC
      ? {
          gridColumnStart: timeStart,
          gridColumnEnd: timeEnd,
          gridRowStart: pcRow,
        }
      : {
          gridRowStart: timeStart,
          gridRowEnd: timeEnd,
          gridColumnStart: mobileRow,
        };
};

const FlightPlaceElement = (props: { info: flightPlace; idx: number }) => {
  const changingStyle = useChangingStyle();
  const { info, idx } = props;
  const { date, time, name, info: placeInfo, code } = info;
  const leftIndex = idx * 4 + 1;
  return (
    <>
      <div
        className="flex flex-row items-center justify-start gap-1 lg:flex-col lg:items-center lg:justify-center lg:gap-0"
        style={changingStyle(leftIndex, leftIndex + 2, 1, 3)}
      >
        <div className="text-sm font-semibold text-[#9F9F9F] lg:text-base ">
          {placeInfo}
        </div>
        {/* <div className="text-sm font-medium text-[#BDBDBD]">({code})</div> */}
      </div>
      <div
        className="flex flex-col-reverse items-end justify-center lg:flex-col lg:items-center lg:justify-start"
        style={changingStyle(leftIndex, leftIndex + 2, 3, 1)}
      >
        <div className="flex flex-col-reverse items-center lg:flex-col">
          {/* <div className="text-[11px] font-normal text-[#494949] lg:text-sm">
            {date}
          </div> */}
          <div className="text-xl font-medium lg:text-2xl">{time}</div>
        </div>
      </div>
      <div
        className="flex h-full w-full items-start justify-center lg:items-center lg:justify-start"
        style={changingStyle(leftIndex + 1, leftIndex + 2, 2, 2)}
      >
        <div className="z-[1] -mt-[5px] h-2.5 w-2.5 rounded-full bg-[#00192F] lg:mt-0 lg:-ml-[5px]"></div>
      </div>
    </>
  );
};

const FlightMiddleElement = (props: { info: flightMiddle; idx: number }) => {
  const changingStyle = useChangingStyle();
  const { info, idx } = props;
  const leftIndex = idx * 4 + 3;
  const move = isMove(info);
  return (
    <>
      <div
        className="flex flex-row items-center justify-start gap-3 lg:flex-col lg:items-center lg:justify-center"
        style={changingStyle(leftIndex, leftIndex + 2, 1, 3)}
      >
        {move && (
          <div
            className={cls(
              " whitespace-pre-wrap rounded border px-3 py-0.5 text-center text-sm font-medium lg:text-base",
              move
                ? "border-[#00192F] text-[#00192F]"
                : "border-[#B8B8B8] text-[#B8B8B8]"
            )}
          >
            {info.time.replace("시간 ", "시간\n")}
          </div>
        )}
        <div className="lg:hidden">
          {move && (
            <div className="whitespace-pre-wrap text-sm">
              {info.company || "항공사"}
              {"\n"}
              <span className="font-bold">{info.code}</span>
            </div>
          )}
        </div>
      </div>
      <div
        className="hidden flex-col items-end justify-center lg:flex lg:items-center lg:justify-start"
        style={changingStyle(leftIndex, leftIndex + 2, 3, 1)}
      >
        {move ? (
          <div className="whitespace-pre-wrap rounded bg-[#F0F0F0] px-3 py-1 text-center">
            {info.company || "항공사"}
            {"\n"}
            <span className="font-bold">{info.code}</span>
          </div>
        ) : (
          <div className="font-normal text-[#B8B8B8]">공항대기</div>
        )}
      </div>
      <div
        className="flex justify-center lg:items-center"
        style={changingStyle(leftIndex - 1, leftIndex + 3, 2, 2)}
      >
        <div
          className="h-full w-[3px] lg:h-[3px] lg:w-full"
          style={{ backgroundColor: move ? "#00192F" : "#DFDFDF" }}
        />
      </div>
    </>
  );
};

export const FlightGraph = (props: { info: flightInfoI }) => {
  const isPC = useIsPC();
  const { info } = props;
  const { place, middle } = info;
  const placeLength = place.length;
  const middleLength = middle.length;
  if (placeLength !== middleLength + 1) {
    console.error("place의 길이는 middle의 길이보다 1 많아야 합니다.");
    return <> </>;
  }
  const timeAxisTemplate = Array(placeLength + middleLength)
    .fill(0)
    .map((_, i) => {
      if (i % 2 === 0) {
        return isPC ? "1fr 1fr" : "30px 30px";
      } else {
        const idx = (i - 1) / 2;
        const targetMiddle = middle[idx];
        if (isMove(targetMiddle)) {
          return isPC ? "1.3fr 1.3fr" : "30px 30px";
        } else {
          return isPC ? "0.8fr 0.8fr" : "24px 24px";
        }
      }
    })
    .join(" ");
  return (
    <div
      className="grid w-full rounded-md border p-4 lg:h-48"
      style={{
        gridTemplateColumns: isPC ? timeAxisTemplate : "1fr 32px 2.5fr",
        gridTemplateRows: isPC ? "1fr 32px 1fr" : timeAxisTemplate,
      }}
    >
      {place.map((p, i) => (
        <FlightPlaceElement info={p} idx={i} key={`place${i}`} />
      ))}
      {middle.map((m, i) => (
        <FlightMiddleElement info={m} idx={i} key={`middle${i}`} />
      ))}
    </div>
  );
};
