import Login from "./LoginPages/Login";
import usePopup from "./usePopup";

export interface loginPopupChanger {
  openPopup: (component: JSX.Element | null) => void;
}

export const useLoginPopup = () => {
  const { component, openPopup } = usePopup();
  const openLogin = () => openPopup(<Login openPopup={openPopup} />);

  return { component, openLogin };
};

export default useLoginPopup;
