import { User } from "./user.js";
import { Cookie } from "./cookies.js";
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

    location.replace(
      `index.html?first-name=${firstName.value}&last-name=${lastName.value}&email=${email.value}&password=${password.value}`
    );
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
    // event.preventDefault();
    errorList.push(errorValue);
    errorEle.textContent = errorValue;
    errorEle.classList.remove("d-none");
  } else {
    errorEle.textContent = "";
    errorList = errorList.filter((e) => e != errorValue);
    errorEle.classList.add("d-none");
  }
}
if (location.search) {
  history.replaceState(null, "", `index.html${location.search}`);
  console.log(location.search);

  firstName.value = location.search.split("&")[0].split("=")[1];
  lastName.value = location.search.split("&")[1].split("=")[1];
  email.value = decodeURIComponent(location.search.split("&")[2].split("=")[1]);
  password.value = decodeURIComponent(
    location.search.split("&")[3].split("=")[1]
  );

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
  if (errorList.length == 0) {
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
    window.close();
  }
  errorList = [];
}
