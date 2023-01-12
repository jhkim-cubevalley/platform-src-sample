import React, { useContext, useEffect, useState } from "react";
import {
  eachFlightI,
  getProductById,
  useProductDetail,
} from "../../utils/api/product";
import useSWR from "swr";
import { secondArgsFetcher } from "../../utils/api";
import MobilePage from "../../components/productsPage/MobilePage";
import PcPage from "../../components/productsPage/PcPage";
import { UserContext } from "../../contexts/UserStore";
import { useRouter } from "next/router";
import { Spinner } from "reactstrap";
import Image from "next/image";
import { flightInfoI } from "../../components/FlightGraph";
import { compareDate } from "../../utils/formatDate";
import {
  getEachEventAPI,
  getEventAPI,
  getOverrideEventData,
} from "../../utils/api/event";

const eachFlightChange = (data?: eachFlightI | undefined) => {
  if (!data) return;
  const {
    flightName,
    flightType,
    isLayover,
    company,
    seatRank,
    canChange,
    departureTime,
    arrivalTime,
    moveTime,
  } = data;
  const splitedMoveTime = moveTime.split(":").map((t) => parseInt(t));
  return {
    flightName,
    flightType,
    isLayover,
    company,
    seatRank,
    canChange,
    departureTime,
    arrivalTime,
    moveTime: { hour: splitedMoveTime[0], minute: splitedMoveTime[1] },
  };
};

export const computeFlightInfo = (flight: eachFlightI[]) => {
  const info = {
    excluded: flight.length === 0,
    arrival: eachFlightChange(
      flight.find((t) => t.flightType === "arrival" && t.isLayover === false)
    ) || {
      flightType: "arrival",
      isLayover: false,
      flightName: "",
      company: "",
      seatRank: "이코노미",
      canChange: false,
      departureTime: "",
      arrivalTime: "",
      moveTime: {
        hour: 0,
        minute: 0,
      },
    },
    departure: eachFlightChange(
      flight.find((t) => t.flightType === "departure" && t.isLayover === false)
    ) || {
      flightType: "departure",
      isLayover: false,
      flightName: "",
      company: "",
      seatRank: "이코노미",
      canChange: false,
      departureTime: "",
      arrivalTime: "",
      moveTime: {
        hour: 0,
        minute: 0,
      },
    },
    layover: {
      arrival: flight
        .filter((t) => t.flightType === "arrival" && t.isLayover === true)
        .map(eachFlightChange),
      departure: flight
        .filter((t) => t.flightType === "departure" && t.isLayover === true)
        .map(eachFlightChange),
    },
  };
  return info;
};

export const flightToInfo = (flight: eachFlightI[]) => {
  const info = computeFlightInfo(flight);
  const data: { arrival: flightInfoI; departure: flightInfoI } = {
    arrival: {
      place: [info.arrival, ...info.layover.arrival]
        .map((t) => [
          {
            name: "",
            info: "출발",
            code: "",
            date: "",
            time: t?.arrivalTime ? t.departureTime.slice(0, 5) : "",
          },
          {
            name: "",
            info: "도착",
            code: "",
            date: "",
            time: t?.arrivalTime ? t.arrivalTime.slice(0, 5) : "",
          },
        ])
        .flat(),
      middle: [info.arrival, ...info.layover.arrival]
        .map((t) => [
          ...(info.arrival.isLayover ? [{ time: "" }] : []),
          {
            time: `${t?.moveTime?.hour || ""}시간${
              t?.moveTime?.minute && t.moveTime.minute !== 0
                ? ` ${t.moveTime.minute}분`
                : ""
            }`,
            code: t?.flightName || "",
            company: t?.company || "",
          },
        ])
        .flat(),
    },
    departure: {
      place: [info.departure, ...info.layover.departure]
        .map((t) => [
          {
            name: "",
            info: "출발",
            code: "",
            date: "",
            time: t?.arrivalTime ? t.departureTime.slice(0, 5) : "",
          },
          {
            name: "",
            info: "도착",
            code: "",
            date: "",
            time: t?.arrivalTime ? t.arrivalTime.slice(0, 5) : "",
          },
        ])
        .flat(),
      middle: [info.departure, ...info.layover.departure]
        .map((t) => [
          ...(t?.isLayover ? [{ time: "" }] : []),
          {
            time: `${t?.moveTime?.hour || ""}시간${
              t?.moveTime?.minute && t.moveTime.minute !== 0
                ? ` ${t.moveTime.minute}분`
                : ""
            }`,
            code: t?.flightName || "",
            company: t?.company || "",
          },
        ])
        .flat(),
    },
  };
  console.log({ flightInfo: data });
  return data;
};

const ProductDetail = ({ isPreview = false }: { isPreview?: boolean }) => {
  const router = useRouter();
  const {
    query: { productid, event = null },
  } = router;

  const { error, data, isValidating } = useSWR(
    ["product", productid],
    secondArgsFetcher(getProductById),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const { data: eventListData } = useSWR(
    ["event", productid],
    secondArgsFetcher(getEventAPI),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: eventData } = useSWR(
    event !== null && ["event", event],
    secondArgsFetcher(getEachEventAPI)
  );
  console.log({ eventData });
  const detailData = useProductDetail(productid as string);
  const [adultNum, setAdultNum] = useState(0);
  const [childNum, setChildNum] = useState(0);
  const [infantNum, setInfantNum] = useState(0);
  const [totalPeopleNum, setTotalPeopleNum] = useState(0);
  const [adultPrice, setAdultPrice] = useState(0);
  const [childPrice, setChildPrice] = useState(0);
  const [infantPrice, setInfantPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const context = useContext(UserContext);
  const { setProductData } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isValidating]);
  const sumData = {
    ...data?.result,
    flight: detailData.flight.data || [],
    note: detailData.note.data || [],
    plan: detailData.plan.data || [],
    tos: detailData.tos.data || [],
    events: eventListData?.result?.data || [],
  };
  useEffect(() => {
    if (data) {
      setProductData(sumData);
    }
    return () => {
      setProductData({});
    };
  }, [
    data,
    detailData.flight.data,
    detailData.note.data,
    detailData.plan.data,
    detailData.tos.data,
  ]);

  useEffect(() => {
    setTotalPrice(adultPrice + childPrice + infantPrice);
  }, [totalPrice, adultPrice, childPrice, infantPrice]);

  useEffect(() => {
    if (adultNum < 0) {
      setAdultNum(0);
    }
    if (childNum < 0) {
      setChildNum(0);
    }
    if (infantNum < 0) {
      setInfantNum(0);
    }
  }, [adultNum, childNum, infantNum]);

  useEffect(() => {
    console.log(error);
    if (error) {
      window.alert(`오류 발생 상태코드 ${error.response.status}`);
      router.push("/");
    }
  }, [error]);

  useEffect(() => {
    if (
      !sumData?.events ||
      sumData.events.length === 0 ||
      isPreview ||
      event !== null
    )
      return;
    const target = [...sumData.events]
      .filter((t) => t.status === "display")
      .sort((a: any, b: any) => compareDate(a.startDate, b.startDate))[0];
    router.replace({
      pathname: `/product/${productid}`,
      query: { event: target.id },
    });
  }, [event, sumData]);

  if (isValidating) {
    return (
      <div className="flex-center h-screen">
        <Spinner />
      </div>
    );
  }
  console.log({ sumData });
  const combinedData =
    eventData?.result && eventData.result.eventType
      ? {
          ...sumData,
          ...getOverrideEventData(eventData.result),
          events: eventListData?.result?.data,
        }
      : sumData;

  if (data) {
    return (
      <>
        {isPreview && (
          <div className="fixed top-0 -z-50 h-screen w-screen bg-[url(/preview.png)] bg-repeat opacity-10">
            {/* <Image src="/preview.png" layout="fill" objectFit="cover" /> */}
          </div>
        )}
        <PcPage
          data={combinedData}
          eventData={eventData?.result}
          flightInfo={flightToInfo(sumData.flight)}
          adultNum={adultNum}
          childNum={childNum}
          infantNum={infantNum}
          totalPeopleNum={totalPeopleNum}
          setAdultNum={setAdultNum}
          setChildNum={setChildNum}
          setInfantNum={setInfantNum}
          setTotalPeopleNum={setTotalPeopleNum}
          adultPrice={adultPrice}
          childPrice={childPrice}
          infantPrice={infantPrice}
          setAdultPrice={setAdultPrice}
          setChildPrice={setChildPrice}
          setInfantPrice={setInfantPrice}
          totalPrice={totalPrice}
        />
        <MobilePage
          id={productid}
          data={combinedData}
          eventData={eventData?.result}
          flightInfo={flightToInfo(sumData.flight)}
          adultNum={adultNum}
          childNum={childNum}
          infantNum={infantNum}
          totalPeopleNum={totalPeopleNum}
          setAdultNum={setAdultNum}
          setChildNum={setChildNum}
          setInfantNum={setInfantNum}
          setTotalPeopleNum={setTotalPeopleNum}
          adultPrice={adultPrice}
          childPrice={childPrice}
          infantPrice={infantPrice}
          setAdultPrice={setAdultPrice}
          setChildPrice={setChildPrice}
          setInfantPrice={setInfantPrice}
          totalPrice={totalPrice}
        />
      </>
    );
  }
  return <></>;
};

export default ProductDetail;
