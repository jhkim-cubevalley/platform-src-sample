import "../styles/globals.css";
import type { AppProps } from "next/app";
import useLogin from "../utils/useLogin";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import NonLogin from "./login";
import usePopup from "../utils/usePopup";
import useIconPopup, { IconPopupInfoI } from "../utils/useIconPopup";
import { useCallback, useEffect } from "react";
import { globalPopupEventName } from "../utils/globalPopup";

function MyApp({ Component, pageProps }: AppProps) {
  const { loginData, loginIsValidating } = useLogin();
  const { component, openPopup, closePopup, isOpen } = useIconPopup(true);
  const openPopupEventListener = useCallback(
    (e: CustomEvent<IconPopupInfoI>) => openPopup(e.detail),
    []
  );
  useEffect(() => {
    if (!window) return;
    window.addEventListener(
      globalPopupEventName,
      openPopupEventListener as any
    );
    return () =>
      window.removeEventListener(
        globalPopupEventName,
        openPopupEventListener as any
      );
  }, []);
  const router = useRouter();
  if (!loginData.login && !loginIsValidating && router.pathname !== "/login") {
    // router.push("/login");
    return (
      <SWRConfig
        value={{
          shouldRetryOnError: false,
        }}
      >
        {component}
        <NonLogin />
      </SWRConfig>
    );
  }
  if (
    loginData.login &&
    loginData.loginType === "admin" &&
    router.pathname.startsWith("/cubeez")
  ) {
    router.push("/admin");
  }
  if (
    loginData.login &&
    loginData.loginType === "cubeez" &&
    router.pathname.startsWith("/admin")
  ) {
    router.push("/cubeez");
  }
  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
      }}
    >
      {component}
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
