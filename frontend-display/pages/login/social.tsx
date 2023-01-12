import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetLogin } from "../../utils/useLogin";

export const Page = () => {
  const { query, replace } = useRouter();
  const setLogin = useSetLogin();
  useEffect(() => {
    if ("accessToken" in query) {
      setLogin({ token: query.accessToken as string });
      // alert("로그인에 성공했습니다.");
      replace("/");
    }
  }, [query, replace]);

  return <div>잠시만 기다려주세요</div>;
};

export default Page;
