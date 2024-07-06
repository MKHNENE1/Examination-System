import { Cookie } from "./cookies.js";
import { User } from "./user.js";
window.onload = function () {
  console.log("test");
  if (!Cookie.hasCookie("userData") && !Cookie.getCookie("userStatus")) {
    location.replace("index.html");
  }
};
