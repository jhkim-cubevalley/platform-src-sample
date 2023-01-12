import { IconPopupInfoI } from "./useIconPopup";

export const globalPopupEventName = "GLOBAL_POPUP_EVENT";

export const openGlobalPopup = (info: IconPopupInfoI) => {
  if (!window) return;
  const e = new CustomEvent<IconPopupInfoI>(globalPopupEventName, {
    detail: info,
  });
  window.dispatchEvent(e);
};

export const openGlobalTextPopup = (text?: any) => {
  openGlobalPopup({ type: "orange", title: `${text || ""}` });
};
