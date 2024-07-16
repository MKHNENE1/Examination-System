import { User } from "./user.js";
import { Cookie } from "./cookies.js";
window.onload = function () {
  if (!Cookie.hasCookie("userData") && !Cookie.getCookie("userStatus")) {
    location.replace("index.html");
  }
};
let submit = document.getElementById("submit"),
  email = document.getElementById("email"),
  password = document.getElementById("password"),
  signError = document.getElementById("sign-error"),
  userData = JSON.parse(Cookie.getCookie("userData"));

document.querySelectorAll(".fa-sharp").forEach((e) => {
  e.parentElement.onclick = () => {
    let type =
      e.parentElement.parentElement.children[0].getAttribute("type") ===
      "password"
        ? "text"
        : "password";
    e.parentElement.parentElement.children[0].setAttribute("type", type);
    e.classList.toggle("fa-eye");
    e.classList.toggle("fa-eye-slash");
  };
});

submit.addEventListener("click", function (e) {
  if (password.value !== userData[1] || email.value !== userData[0]["email"]) {

    e.preventDefault();
    signError.classList.remove("d-none");
    signError.textContent = "Invalied Email or Password";
  }
});

const curser = document.querySelector(".curser");
document.addEventListener("mousemove", function (e) {
  let X = e.clientX;
  let Y = e.clientY;
  curser.style.left = X + "px";
  curser.style.top = Y + "px";
});
