import { ConfigService } from '@nestjs/config';
import * as dayjs from 'dayjs';
import { xml2json } from 'xml-js';
import got from 'got';

interface FlightInfoType {
  company: string;
  arrivalTime: string;
  startTime: string;
  moveTime: string;
}

const DOMESTIC_HOST = 'http://openapi.airport.co.kr/service/rest/FlightScheduleList/getDflightScheduleList';
const INTERNATIONAL_HOST = 'http://openapi.airport.co.kr/service/rest/FlightScheduleList/getIflightScheduleList';

/* eslint-disable no-underscore-dangle */

async function getDomesticFlight(
  apiKey: string,
  today: string,
  flight: string
): Promise<Record<string, { _text: string }> | null> {
  let host = `${DOMESTIC_HOST}`;
  host += `?${encodeURIComponent('serviceKey')}=${encodeURIComponent(apiKey)}`;
  host += `&${encodeURIComponent('schDate')}=${encodeURIComponent(today)}`;
  host += `&${encodeURIComponent('schFlightNum')}=${encodeURIComponent(flight)}`;
  const { body: domesticBody } = await got.get(host);
  const domesticJson = JSON.parse(xml2json(domesticBody, { compact: true }));
  return Array.isArray(domesticJson.response.body.items.item)
    ? domesticJson.response.body.items.item[0]
    : domesticJson.response.body.items.item;
}

async function getInternationalFlight(apiKey, today, flight): Promise<Record<string, { _text: string }> | null> {
  let host = `${INTERNATIONAL_HOST}`;
  host += `?${encodeURIComponent('serviceKey')}=${encodeURIComponent(apiKey)}`;
  host += `&${encodeURIComponent('schDate')}=${encodeURIComponent(today)}`;
  host += `&${encodeURIComponent('schFlightNum')}=${encodeURIComponent(flight)}`;
  const { body: internationalBody } = await got.get(host);
  const internationalJson = JSON.parse(xml2json(internationalBody, { compact: true }));
  return Array.isArray(internationalJson.response.body.items.item)
    ? internationalJson.response.body.items.item[0]
    : internationalJson.response.body.items.item;
}

export async function getFlightInfo(config: ConfigService, flight: string): Promise<Partial<FlightInfoType>> {
  const today = dayjs().format('YYYYMMDD');
  const apiKey = config.get('FLIGHT_API_KEY');

  const domesticData = await getDomesticFlight(apiKey, today, flight);
  if (domesticData !== undefined) {
    const startTime = `${domesticData.domesticStartTime._text.slice(0, 2)}:${domesticData.domesticStartTime._text.slice(
      2,
      4
    )}:00`;
    const arrivalTime = `${domesticData.domesticArrivalTime._text.slice(
      0,
      2
    )}:${domesticData.domesticArrivalTime._text.slice(2, 4)}:00`;
    const moveTime = `${(
      Number(domesticData.domesticArrivalTime._text.slice(0, 2)) -
      Number(domesticData.domesticStartTime._text.slice(0, 2))
    )
      .toString()
      .padStart(2, '0')}:${(
      Number(domesticData.domesticArrivalTime._text.slice(0, 2)) -
      Number(domesticData.domesticStartTime._text.slice(0, 2))
    )
      .toString()
      .padStart(2, '0')}`;
    return {
      company: domesticData.airlineKorean._text,
      startTime,
      arrivalTime,
      moveTime
    };
  }

  const internationalData = await getInternationalFlight(apiKey, today, flight);
  if (internationalData === undefined) return null;
  const arrivalTime = `${internationalData.internationalTime._text.slice(
    0,
    2
  )}:${internationalData.internationalTime._text.slice(2, 4)}:00`;
  return {
    company: internationalData.airlineKorean._text,
    startTime: undefined,
    arrivalTime,
    moveTime: undefined
  };
}
