import { useEffect, useState } from "react";
import { loginType } from "./useLogin";

const forcedAdmin = false;

export const usePageType = () => {
  const [PageType, setPageType] = useState<loginType>("cubeez");
  useEffect(() => {
    if (location) {
      setPageType(
        forcedAdmin || location.hostname.startsWith("admin.")
          ? "admin"
          : "cubeez"
      );
    }
  }, []);
  return PageType;
};
