import useSWR from "swr";
import { secondArgsFetcher } from ".";
import { SWRImmutableConfig } from "../data";
import { useLoginCheck } from "../useLogin";
import { getGroupAPI } from "./admin/group";

export type groupType = "USER" | "ADMIN" | "CUBEEZ";

export const useGroup = (type: groupType) => {
  const loginCheck = useLoginCheck();
  const { data, mutate, isValidating } = useSWR(
    loginCheck(["/group", type]),
    secondArgsFetcher(getGroupAPI),
    {
      ...SWRImmutableConfig,
    }
  );
  return {
    data: data || [],
    mutate,
    isValidating,
  };
};
