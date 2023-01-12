import { useState } from "react";
import { loginPopupChanger } from "../useLoginPopup";
import RegisterAgree from "./RegisterAgree";
import RegisterInfo from "./RegisterInfo";

export type registerStep = "agree" | "info";

export const Register = (props: loginPopupChanger & { isSocial?: string }) => {
  const [Step, setStep] = useState<registerStep>("agree");
  if (Step === "agree") return <RegisterAgree setStep={setStep} />;
  if (Step === "info") return <RegisterInfo {...props} />;
  else return <></>;
};

export default Register;
