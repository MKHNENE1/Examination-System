
import { User } from "./user.js";
import { Cookie } from "./cookies.js";

window.onload = function () {
  if (Cookie.hasCookie("userData") && Cookie.getCookie("userStatus")) {
    location.replace("login.html");
  }
};
let submit = document.getElementById("submit");

let firstName = document.getElementById("first_name"),
  lastName = document.getElementById("last_name"),
  email = document.getElementById("email"),
  password = document.getElementById("password"),
  repassword = document.getElementById("repassword"),
  fnError = document.getElementById("fn-error"),
  lnError = document.getElementById("ln-error"),
  eError = document.getElementById("e-error"),
  pError = document.getElementById("p-error"),
  rpError = document.getElementById("rp-error"),
  errorList = [];

submit.addEventListener("click", (e) => {
  validate(
    firstName,
    !/^[a-zA-Z]+$/.test(firstName.value),
    fnError,
    errorList,
    "First Name must be a string"
  );
  validate(
    lastName,
    !/^[a-zA-Z]+$/.test(lastName.value),
    lnError,
    errorList,
    "Last Name must be a string"
  );
  validate(
    email,
    !/^[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,}$/.test(email.value.toLowerCase()),
    eError,
    errorList,
    "Enter Valid Email"
  );
  validate(
    password,
    password.value.length < 8,
    pError,
    errorList,
    "Your Password Less than 8 characters"
  );
  validate(
    repassword,
    repassword.value != password.value,
    rpError,
    errorList,
    "Password is not identical"
  );
  if (errorList.length == 0) {

    e.preventDefault();

    let studint = new User(
      firstName.value,
      lastName.value,
      email.value,
      password.value
    );
    Cookie.setCookie(
      "userData",
      JSON.stringify([studint, studint.getPassword()]),
      new Date("6,10,2025")
    );
    Cookie.setCookie("userStatus", true, new Date("6,10,2025"));

    location.replace(`login.html`);

  } else {
    e.preventDefault();
  }
  errorList = [];
});

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

firstName.onblur = () => {
  validate(
    firstName,
    !/^[a-zA-Z]+$/.test(firstName.value),
    fnError,
    errorList,
    "First Name must be a string"
  );
};
lastName.onblur = () => {
  validate(
    lastName,
    !/^[a-zA-Z]+$/.test(lastName.value),
    lnError,
    errorList,
    "Last Name must be a string"
  );
};
email.onblur = () => {
  validate(
    email,
    !/^[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,}$/.test(email.value.toLowerCase()),
    eError,
    errorList,
    "Enter Valid Email"
  );
};
password.onblur = () => {
  validate(
    password,
    password.value.length < 8,
    pError,
    errorList,
    "Your Password Less than 8 characters"
  );
};
repassword.onblur = () => {
  validate(
    repassword,
    repassword.value != password.value,
    rpError,
    errorList,
    "Password is not identical"
  );
};

function validate(ele, cond, errorEle, errorList, errorValue) {
  if (!ele.value || cond) {
    errorList.push(errorValue);
    errorEle.textContent = errorValue;
    errorEle.classList.remove("d-none");
  } else {
    errorEle.textContent = "";
    errorList = errorList.filter((e) => e != errorValue);
    errorEle.classList.add("d-none");
  }
}

const curser = document.querySelector(".curser");
document.addEventListener("mousemove", function (e) {
  let X = e.clientX;
  let Y = e.clientY;
  curser.style.left = X + "px";
  curser.style.top = Y + "px";
});

