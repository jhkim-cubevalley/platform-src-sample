import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useRegionAPI } from "./api/region";

export const useRegionInput = (info: {
  continent?: string;
  country?: string;
  city?: string;
  defaultName?: string;
  useForm: UseFormReturn<any>;
}) => {
  const {
    continent = "continent",
    country = "country",
    city = "city",
    defaultName = "전체",
    useForm,
  } = info;
  const { watch, setValue, getValues } = useForm;
  const { data } = useRegionAPI();
  useEffect(() => {
    if (!data?.result?.data) return;
    const nows = getValues([continent, country, city]);
    const targets = nows.map((now) =>
      data.result.data.find((t) => t.id === now)
    );
    if (targets[1]?.parent?.id !== nows[0]) setValue(country, "");
    if (targets[2]?.parent?.id !== nows[1]) setValue(city, "");
  }, [watch(continent)]);
  useEffect(() => {
    if (!data?.result?.data) return;
    const nows = getValues([continent, country, city]);
    const targets = nows.map((now) =>
      data.result.data.find((t) => t.id === now)
    );
    if (targets[2]?.parent?.id !== nows[1]) setValue(city, "");
  }, [watch(country)]);

  return {
    continentList: [
      { value: "", name: defaultName },
      ...(data?.result?.data
        ? data.result.data
            .filter((r: any) => r.depth === 1 && r?.isEnable)
            .map((r: any) => ({ value: r.id, name: r.name }))
        : []),
    ],
    countryList: [
      { value: "", name: defaultName },
      ...(data?.result?.data
        ? data.result.data
            .filter(
              (r: any) =>
                r.depth === 2 &&
                r?.parent?.id === watch(continent) &&
                r?.isEnable
            )
            .map((r: any) => ({ value: r.id, name: r.name }))
        : []),
    ],
    cityList: [
      { value: "", name: defaultName },
      ...(data?.result?.data
        ? data.result.data
            .filter(
              (r: any) =>
                r.depth === 3 && r?.parent?.id === watch(country) && r?.isEnable
            )
            .map((r: any) => ({ value: r.id, name: r.name }))
        : []),
    ],
  };
};
