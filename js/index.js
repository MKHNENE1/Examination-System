// jQuery.validator.setDefaults({
//   debug: true,
//   success: function (label) {
//     label.attr("id", "valid");
//   },
// });
// $("#myform").validate({
//   rules: {
//     password: "required",
//     comfirm_password: {
//       equalTo: "#password",
//     },
//   },
//   messages: {
//     first_name: {
//       required: "Please enter a firstname",
//     },
//     last_name: {
//       required: "Please enter a lastname",
//     },
//     your_email: {
//       required: "Please provide an email",
//     },
//     password: {
//       required: "Please enter a password",
//     },
//     comfirm_password: {
//       required: "Please enter a password",
//       equalTo: "Wrong Password",
//     },
//   },
// });
import { User } from "./user.js";
import { Cookie } from "./cookies.js";

window.onload = function () {
  if (Cookie.hasCookie("userData") && Cookie.getCookie("userStatus")) {
    location.replace("login.html");
  }
};
// history.replaceState(null, "", "login.html");
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
    // User Data will insert here
    // login.html?first-name=Mohamed&last-name=Halabia&email=mohamedhalabya11%40gmail.com&password=123456789
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
    // sessionStorage.setItem(
    //   "userData",
    //   JSON.stringify([studint, studint.getPassword()])
    // );
    // console.log(JSON.parse(sessionStorage.getItem("userData")));
    // history.replaceState(null, "", "login.html");
    location.replace(`login.html`);
    // window.open("login.html", "_");

    // user = new User(
    //   firstName.value,
    //   lastName.value,
    //   email.value,
    //   password.value
    // );
    // history.replaceState(null, null, null);
    // location.replace(`index.html`);
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
// if (location.search) {
//   history.replaceState(null, "", `index.html${location.search}`);
//   console.log(location.search);

//   firstName.value = location.search.split("&")[0].split("=")[1];
//   lastName.value = location.search.split("&")[1].split("=")[1];
//   email.value = decodeURIComponent(location.search.split("&")[2].split("=")[1]);
//   password.value = decodeURIComponent(
//     location.search.split("&")[3].split("=")[1]
//   );

//   validate(
//     firstName,
//     !/^[a-zA-Z]+$/.test(firstName.value),
//     fnError,
//     errorList,
//     "First Name must be a string"
//   );
//   validate(
//     lastName,
//     !/^[a-zA-Z]+$/.test(lastName.value),
//     lnError,
//     errorList,
//     "Last Name must be a string"
//   );
//   validate(
//     email,
//     !/^[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,}$/.test(email.value.toLowerCase()),
//     eError,
//     errorList,
//     "Enter Valid Email"
//   );
//   validate(
//     password,
//     password.value.length < 8,
//     pError,
//     errorList,
//     "Your Password Less than 8 characters"
//   );
//   if (errorList.length == 0) {
//     let studint = new User(
//       firstName.value,
//       lastName.value,
//       email.value,
//       password.value
//     );
//     Cookie.setCookie(
//       "userData",
//       JSON.stringify([studint, studint.getPassword()]),
//       new Date("6,10,2025")
//     );
//     Cookie.setCookie("userStatus", true, new Date("6,10,2025"));
//     // sessionStorage.setItem(
//     //   "userData",
//     //   JSON.stringify([studint, studint.getPassword()])
//     // );
//     // console.log(JSON.parse(sessionStorage.getItem("userData")));
//     // history.replaceState(null, "", "login.html");
//     location.replace(`login.html`);
//     // console.log("done");
//     // window.open("login.html", "_");
//   } else {
//     window.close();
//     // location.replace(`index.html`);
//   }
//   errorList = [];
// }

//////////////////////////////////////////////////////////////////////////////

// if (location.search) {
//   history.replaceState(null, "", `index.html${location.search}`);
//   console.log(location.search);

//   firstName.value = location.search.split("&")[0].split("=")[1];
//   lastName.value = location.search.split("&")[1].split("=")[1];
//   email.value = decodeURIComponent(location.search.split("&")[2].split("=")[1]);
//   password.value = decodeURIComponent(
//     location.search.split("&")[3].split("=")[1]
//   );

//   validate(
//     firstName,
//     !/^[a-zA-Z]+$/.test(firstName.value),
//     fnError,
//     errorList,
//     "First Name must be a string"
//   );
//   validate(
//     lastName,
//     !/^[a-zA-Z]+$/.test(lastName.value),
//     lnError,
//     errorList,
//     "Last Name must be a string"
//   );
//   validate(
//     email,
//     !/^[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,}$/.test(email.value.toLowerCase()),
//     eError,
//     errorList,
//     "Enter Valid Email"
//   );
//   validate(
//     password,
//     password.value.length < 8,
//     pError,
//     errorList,
//     "Your Password Less than 8 characters"
//   );
//   if (errorList.length == 0) {
//     let studint = new User(
//       firstName.value,
//       lastName.value,
//       email.value,
//       password.value
//     );
//     Cookie.setCookie(
//       "userData",
//       JSON.stringify([studint, studint.getPassword()]),
//       new Date("6,10,2025")
//     );
//     Cookie.setCookie("userStatus", true, new Date("6,10,2025"));
//     // sessionStorage.setItem(
//     //   "userData",
//     //   JSON.stringify([studint, studint.getPassword()])
//     // );
//     // console.log(JSON.parse(sessionStorage.getItem("userData")));
//     // history.replaceState(null, "", "login.html");
//     location.replace(`login.html`);
//     // console.log("done");
//     // window.open("login.html", "_");
//   } else {
//     window.close();
//     // location.replace(`index.html`);
//   }
//   errorList = [];
// }
