import { openGlobalPopup, openGlobalTextPopup } from "./globalPopup";

let available = true;
const timeout = 2000;
function init() {
  available = true;
}
export function debouncedAlert(a: string) {
  if (available) {
    available = false;
    setTimeout(init, timeout);
    // alert(a);
    openGlobalTextPopup(a);
  }
}
