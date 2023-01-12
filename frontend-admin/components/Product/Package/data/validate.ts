import { formatDateObjToString } from "../../../../utils/formatDate";

const validateFlights = (flights: any) => {
  return flights.excluded
    ? []
    : [

  const endTime = new Date(end).getTime();
  const diff = endTime - startTime;
  if (diff < 0) return [];
  const daysNum = diff / oneDayTime + 1;
  if (isNaN(daysNum)) return [];
  return Array(daysNum)
    .fill(0)
    .map((_, i) => {
      const d = new Date(startTime + oneDayTime * i);
      return {
        str: formatDateObjToString(d),
        day: d.getDay(),
      };
    })
    .filter(({ day }) => daysList.findIndex((t) => t === day) >= 0)
    .map(({ str }) => str);
};

export const validate = (data: any) => {
  const {
    name,
    nameEn,
    fuelSurcharge,
    priceAdult,
    priceTeen,
    priceKid,
    priceText,
    images,
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
    categories,
    regions,
    flights,
    notes,
    plans,
    tos,
  } = data;
  const changeFlights = validateFlights(flights);
  const changeNotes = [
    ...notes.in.map((t: any) => ({ ...t, type: "in" })),
    ...notes.notin.map((t: any) => ({ ...t, type: "notin" })),
  ];
  const changePlans = validatePlans(plans);
  const changeImages = images.map((d: any, i: any) => ({
    ...d,
    isThumb: i === 0,
  }));
  return {
    name,
    nameEn,
    fuelSurcharge: parseInt(fuelSurcharge),
    priceAdult: parseInt(priceAdult),
    priceTeen: parseInt(priceTeen),
    priceKid: parseInt(priceKid),
    priceText,
    images: changeImages,
    minPeople: parseInt(minPeople),
    maxPeople: parseInt(maxPeople),
    departure,
    dateFrom,
    dateTo,
    departurePeriod: departurePeriod.join(","),
    endDay: parseInt(endDay),
    description,
    pros: pros.join(","),
    tag,
    isManagement: `${isManagement}` === "true",
    managementType: managementType.join(","),
    moreMessage: moreMessage,
    content,
    tripDate: parseInt(tripDate),
    tripNight: parseInt(tripNight),
    moreNote,
    caution,
    refund,
    categories,
    regions,
    flights: changeFlights,
    notes: changeNotes,
    plans: changePlans,
    tos: tos.filter((t: any) => t && t.length > 0),
  };
};

export const validateEventType = (data: any) => {
  const {
    productId,
    type,
    description,
    fuelSurcharge,
    priceAdult,
    priceTeen,
    priceKid,
    dateFrom,
    dateTo,
    departurePeriod,
    plans,
    flights,
    tripNight,
    tripDate,
  } = data;
  return {
    productId,
    type,
    description,
    fuelSurcharge,
    priceAdult,
    priceTeen,
    priceKid,
    startDate: validateDays(departurePeriod, dateFrom, dateTo),
    flights: validateFlights(flights),
    plans: validatePlans(plans),
  };
};
