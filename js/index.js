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
let firstName = document.getElementById("first_name"),
  lastName = document.getElementById("last_name"),
  email = document.getElementById("email"),
  password = document.getElementById("password"),
  repassword = document.getElementById("repassword"),
  submit = document.getElementById("submit");

submit.addEventListener("click", (e) => {
  errorList = [];
  let fnError = document.getElementById("fn-error"),
    lnError = document.getElementById("ln-error"),
    eError = document.getElementById("e-error"),
    pError = document.getElementById("p-error"),
    rpError = document.getElementById("rp-error");
  // e.preventDefault();
  // console.log(
  //   !/^[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,}$/.test(email.value.toLowerCase())
  // );
  if (!firstName.value && isFinite(firstName.value)) {
    e.preventDefault();
    errorList.push("First Name must be a string");
    fnError.textContent = "First Name must be a string";
  }
  if (lastName.value && isFinite(lastName.value)) {
    e.preventDefault();
    errorList.push("Last Name must be a string");
    lnError.textContent = "Last Name must be a string";
  }
  if (
    !email.value ||
    !/^[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,}$/.test(email.value.toLowerCase())
  ) {
    e.preventDefault();
    errorList.push("Enter Valid Email");
    eError.textContent = "Enter Valid Email";
  }
});
