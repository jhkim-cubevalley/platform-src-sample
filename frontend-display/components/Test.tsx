import React from "react";
import { FlightGraph, flightInfoI } from "./FlightGraph";

const flightDummyData: flightInfoI = {
  place: [
    {
      name: "제주",
      info: "출발",
      code: "CJU",
      date: "2022. 01. 27",
      time: "10:00",
    },
    {
      name: "서울",
      info: "도착",
      code: "ICN",
      date: "2022. 01. 27",
      time: "12:00",
    },
    {
      name: "서울",
      info: "출발",
      code: "ICN",
      date: "2022. 01. 27",
      time: "13:00",
    },
    {
      name: "스페인",
      info: "도착",
      code: "BCN",
      date: "2022. 01. 27",
      time: "21:00",
    },
  ],
  middle: [
    { time: "2시간 30분", code: "KE101" },
    { time: "1시간" },
    { time: "9시간 20분", code: "KE102" },
  ],
};

export const Test = () => {
  return (
    <div className=" w-full max-w-[1400px] ">
      <FlightGraph info={flightDummyData} />
    </div>
  );
};

export default Test;
