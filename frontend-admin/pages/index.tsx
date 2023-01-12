import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import useLogin, { useSetLogin } from "../utils/useLogin";

const Home: NextPage = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { loginData } = useLogin();
  if (loginData.login) {
    router.replace(`/${loginData.loginType}`);
  }
  return <div className="w-full relative flex items-center flex-col"></div>;
};

export default Home;
