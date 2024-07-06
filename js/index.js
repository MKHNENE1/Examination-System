let nameRegx = /^[A-Za-z ]+$/;
let emailRegx =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

let fnError = document.getElementById("fn-error"),
  eError = document.getElementById("e-error"),
  pError = document.getElementById("p-error"),
  rpError = document.getElementById("rp-error");
lnError = document.getElementById("ln-error");
let firstName = document.getElementById("first_name"),
  lastName = document.getElementById("last_name"),
  email = document.getElementById("email"),
  password = document.getElementById("password"),
  repassword = document.getElementById("repassword"),
  submit = document.getElementById("submit");

firstName.addEventListener("change", () => {
  if (!nameRegx.test(firstName.value)) {
    fnError.style.display = "block";
    fnError.textContent = " Please enter Valid First name";
  } else {
    fnError.style.display = "none";
    fnError.textContent = "";
  }
});
lastName.addEventListener("change", () => {
  if (!nameRegx.test(lastName.value)) {
    lnError.style.display = "block";
    lnError.textContent = "Please enter Valid Last name";
  } else {
    lnError.style.display = "none";
    lnError.textContent = "";
  }
});
email.addEventListener("change", () => {
  if (!emailRegx.test(email.value)) {
    eError.style.display = "block";
    eError.textContent = "Please enter Valid email address";
  } else {
    eError.style.display = "none";
    eError.textContent = "";
  }
});
password.addEventListener("change", () => {
  if (password.value.split("").length < 8) {
    pError.style.display = "block";
    pError.textContent = "password must be at least 8 chars";
  } else {
    pError.style.display = "none";
    pError.textContent = "";
  }
});
repassword.addEventListener("change", () => {
  if (repassword.value !== password.value) {
    rpError.style.display = "block";
    rpError.textContent = "password does not match";
  } else {
    rpError.style.display = "none";
    rpError.textContent = "";
  }
});
submit.addEventListener("click", (e) => {
  if (
    !(
      rpError.textContent == "" &&
      pError.textContent == "" &&
      fnError.textContent == "" &&
      lnError.textContent == "" &&
      eError.textContent == ""
    )
  ) {
    e.preventDefault();
  }
});
