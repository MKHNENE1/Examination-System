// import { User } from "./user.js";
import { Question } from "./questions.js";

import { Cookie } from "./cookies.js";
console.log(JSON.parse(Cookie.getCookie("userData")));
let obj = JSON.parse(Cookie.getCookie("userData"));
console.log(obj[0].grads);

let userName = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");

userName.textContent += ` ${obj[0]["firstName"]} ${obj[0]["lastName"]}`;
userEmail.textContent += ` ${obj[0]["email"]}`;
