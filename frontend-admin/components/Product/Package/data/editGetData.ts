import { eachFlightI, eachProductI } from "../../../../utils/api/product";
import { formatDate } from "../../../../utils/formatDate";

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

export const editGetData = (data: eachProductI) => {
  const {
    id,
    code,
    name,
    nameEn,
    fuelSurcharge,
    priceAdult,
    priceTeen,
    priceKid,
    priceText,
    image,
    minPeople,
    maxPeople,
    departure,
    dateFrom,
    dateTo,
    departurePeriod,
    endDay,
    description,
    pros,
    tag,
    isManagement,
    managementType,
    moreMessage,
    status,
    content,
    tripDate,
    tripNight,
    moreNote,
    caution,
    refund,
    category,
    region,
    flight,
    note,
    plan,
    tos,
    productTos,
  } = data;
  const changePlans = plan
    .map((t) => ({
      day: t.day,
      description: t.description,
      details: t.planDetail.map((t) => {
        const isLibrary = t.library !== null;
        if (isLibrary)
          return {
            type: "라이브러리",
            content: "",
            libraryId: t.library?.id,
          };
        return {
          type: t.type,
          content: t.content,
          libraryId: null,
        };
      }),
    }))
    .sort((a, b) => a.day - b.day);
  // console.log((productTos || []).map((t) => t.tos.id));
  return {
    isForIncentive: false,
    name,
    nameEn,
    fuelSurcharge,
    priceAdult,
    priceTeen,
    priceKid,
    priceText,
    minPeople,
    maxPeople,
    departure,
    dateFrom: dateFrom ? dateFrom.slice(0, 10) : "",
    dateTo: dateTo ? dateTo.slice(0, 10) : "",
    departurePeriod: departurePeriod ? departurePeriod.split(",") : [],
    endDay,
    description,
    pros: pros.split(","),
    regions: region.map((t) => ({
      regionOne: t.regionOne.id,
      regionTwo: t.regionTwo.id,
      regionThree: t.regionThree.id,
    })),
    categories: category.map((t) => ({
      categoryOne: t.categoryOne.id,
      categoryTwo: t.categoryTwo.id,
      categoryThree: t.categoryThree.id,
    })),
    tag,
    isManagement: `${isManagement}` === "true",
    managementType: managementType === null ? [] : managementType.split(","),
    moreMessage: moreMessage || "",
    flights: {
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
        flight.find(
          (t) => t.flightType === "departure" && t.isLayover === false
        )
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
    },
    content,
    tripNight,
    tripDate,
    plans: changePlans,
    notes: {
      in: note
        .filter((t) => t.type === "in")
        .map(({ title, description }) => ({ title, description })),
      notin: note
        .filter((t) => t.type === "notin")
        .map(({ title, description }) => ({ title, description })),
    },
    moreNote,
    caution,
    refund,
    tos: (tos || []).map((t) => t.tos.id),
    images: image.map((t) => ({ url: t.imageUrl, isThumb: t.isThumb })),
  };
};
