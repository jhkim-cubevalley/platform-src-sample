/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getNavInfo } from "./NavInfo";
import { loginType } from "./useLogin";

export const Redirecter = (props: { type: loginType; code: string }) => {
  const { type, code } = props;
  const router = useRouter();
  const info = getNavInfo(type);
  const sub = info.find((d) => d.code === code)?.sub || [{ code: "error" }];
  useEffect(() => {
    router.replace(`/${type}/${code}${sub[0].code}`);
  }, []);

  return <></>;
};

export default Redirecter;
