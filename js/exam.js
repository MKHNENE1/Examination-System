import { Cookie } from "./cookies.js";
import { Question } from "./questions.js";
var questions = [];
var currentQuestionIndex = 0;
var selectedAnswers = {};
var timer;
var examDuration = 600;
let qsNumber = document.getElementById("questions-number");
let currentQs = document.getElementById("current-question");
let userData = JSON.parse(Cookie.getCookie("userData"));
async function getJsonData() {
  try {
    var res = await fetch("./json/questions.json");
    var resp = await res.json();
    resp.forEach(function (el) {
      var obj = new Question(
        el.question,
        el.A,
        el.B,
        el.C,
        el.D,
        el.answer,
        false
      );
      // var obj = {
      //   title: el.question,
      //   a: el.A,
      //   b: el.B,
      //   c: el.C,
      //   d: el.D,
      //   answer: el.answer,
      //   flag: false,
      // };
      questions.push(obj);
    });
    // console.log(randomizeParentObjectValues(questions));
    questions = randomizeParentObjectValues(questions);
    displayQuestion(currentQuestionIndex);
    startTimer(examDuration);
    qsNumber.textContent = questions.length;
    currentQs.textContent = currentQuestionIndex + 1;
    // console.log(questions);
    // console.log(qsNumber.textContent);
    // console.log(currentQs.textContent);
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function randomizeParentObjectValues(obj) {
  return shuffleArray(Object.values(obj));
}

function displayQuestion(index, option = false) {
  var questionnaireDiv = document.getElementById("questionnaire");
  questionnaireDiv.innerHTML = "";

  if (index < 0 || index >= questions.length) return;

  var el = questions[index];

  var fieldset = document.createElement("fieldset");
  fieldset.setAttribute("id", `step${index + 1}`);

  var questionHeader = document.createElement("h1");
  questionHeader.classList.add("question");
  questionHeader.textContent = el.title;

  var optionsDiv = document.createElement("div");
  optionsDiv.classList.add(
    "options",
    "d-flex",
    "flex-wrap",
    "justify-content-between"
  );

  var option1 = createAnswerOption(el.a, `op${index + 1}`, "A");
  var option2 = createAnswerOption(el.b, `op${index + 1}`, "B");
  var option3 = createAnswerOption(el.c, `op${index + 1}`, "C");
  var option4 = createAnswerOption(el.d, `op${index + 1}`, "D");

  optionsDiv.appendChild(option1);
  optionsDiv.appendChild(option2);
  optionsDiv.appendChild(option3);
  optionsDiv.appendChild(option4);

  var flagButton = document.createElement("button");
  // flagButton.textContent = el.flag ? "Unflag" : "Flag";
  flagButton.classList.add(
    "fa-solid",
    "fa-bookmark",
    "border-0",
    "bg-warning",
    "text-light",
    "p-3",
    "mt-3",
    "edits",
    "flag-button"
  );
  flagButton.addEventListener("click", () => toggleFlagQuestion(index));

  fieldset.appendChild(questionHeader);
  fieldset.appendChild(flagButton);
  fieldset.appendChild(optionsDiv);

  questionnaireDiv.appendChild(fieldset);

  document.getElementById("prev-button").style.display =
    index === 0 ? "none" : "inline-block";
  index !== 0
    ? (document.querySelector(".navigation-buttons").style.justifyContent =
        "space-between")
    : (document.querySelector(".navigation-buttons").style.justifyContent =
        "flex-end");
  // if (option == true) {
  //   document.getElementById("next-button").disabled = index in selectedAnswers;
  // } else {
  //   document.getElementById("next-button").disabled = !(
  //     index in selectedAnswers
  //   );
  // }
  // document.getElementById("next-button").innerHTML =
  //   index === questions.length - 1
  //     ? '<i class="fa-solid fa-circle-check"></i>'
  //     : '<i class="fa-solid fa-circle-arrow-right"></i>';
  if (index === questions.length - 1) {
    document.getElementById("next-button").innerHTML =
      '<i class="fa-solid fa-circle-check"></i>';
    // console.log("tesst");
    document
      .getElementById("next-button")
      .classList.replace("text-primary", "text-success");
  } else {
    document.getElementById("next-button").innerHTML =
      '<i class="fa-solid fa-circle-arrow-right"></i>';
    document
      .getElementById("next-button")
      .classList.replace("text-success", "text-primary");
    // console.log(document.getElementById("next-button").innerHTML);
  }
  var radioButtons = optionsDiv.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      selectedAnswers[index] = radio.value;
      // document.getElementById("next-button").disabled = false;
    });

    if (selectedAnswers[index] && radio.value === selectedAnswers[index]) {
      radio.checked = true;
    }
  });

  updateFlaggedQuestionsSidebar();
}

function createAnswerOption(answerText, questionName, optionLabel) {
  var optionDiv = document.createElement("div");
  optionDiv.classList.add("option", "animate");

  var input = document.createElement("input");
  input.setAttribute("type", "radio");
  input.setAttribute("name", questionName);
  input.setAttribute("value", optionLabel);
  var label = document.createElement("label");
  label.textContent = answerText;

  optionDiv.appendChild(input);
  optionDiv.appendChild(label);

  return optionDiv;
}

function showNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    currentQs.textContent = currentQuestionIndex + 1;
    displayQuestion(currentQuestionIndex);
  } else {
    userData[0].result = [];
    showResults();
    // console.log(userData[0].grades);
  }
  // console.log(questions.length);
}
function showPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQs.textContent = currentQuestionIndex;
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
  }
}

function toggleFlagQuestion(index) {
  questions[index].flag = !questions[index].flag;
  updateFlaggedQuestionsSidebar();
  let val = document.querySelector(".flag-button");
  if (val.classList.contains("fa-bookmark")) {
    val.classList.remove("fa-bookmark");
    val.classList.add("fa-bookmark-slash");
    // document.getElementById("next-button").disabled = false;
  } else {
    val.classList.add("fa-bookmark");
    val.classList.remove("fa-bookmark-slash");
    // document.getElementById("next-button").disabled = true;
  }

  if (document.getElementById("alerts-container").children.length !== 0) {
    document.querySelector(".flaged-questions").style.display = "block";
  } else {
    document.querySelector(".flaged-questions").style.display = "none";
  }
}

function updateFlaggedQuestionsSidebar() {
  var sidebar = document.getElementById("alerts-container");
  sidebar.innerHTML = "";
  questions.forEach((question, index) => {
    if (question.flag) {
      var card = document.createElement("div");
      var questionString = document.createElement("p");
      questionString.classList.add("questionString");
      questionString.classList.add("m-0");
      card.classList.add("flagged-question-card");
      card.classList.add("alert");
      card.classList.add("alert-warning");
      // card.setAttribute("role", "alert");
      questionString.textContent = question.title;
      card.innerHTML += `<i class="fa-solid fa-flag"></i>`;
      card.addEventListener("click", () => {
        currentQuestionIndex = index;
        displayQuestion(index, true);
      });
      card.appendChild(questionString);
      sidebar.appendChild(card);
    }
  });
}

function startTimer(duration) {
  var timerDiv = document.getElementById("time-remaining");
  var timerBar = document.getElementById("progressBar");
  var minutes, seconds;
  let bar = duration;

  timer = setInterval(function () {
    minutes = parseInt(duration / 60, 10);
    seconds = parseInt(duration % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerDiv.textContent = minutes + ":" + seconds;
    // var progressPercentage = (duration - duration) / 60;
    timerBar.style.width = ((bar - duration) / bar) * 100 + "%";
    // timerBar.textContent = Math.floor(((bar - duration) / bar) * 100) + "%";
    // console.log(progressPercentage);
    // console.log(((bar - duration) / bar) * 100);
    if (--duration < 0) {
      clearInterval(timer);
      showTimeoutPage();
    }
  }, 1000);
}

function showResults() {
  clearInterval(timer);
  // window.removeEventListener("beforeunload", stopReload);
  // document.getElementById("results-screen").classList.remove("d-none");
  // var resultsDiv = document.getElementById("results");
  var correctAnswers = 0;
  // console.log(questions.length);
  questions.forEach((question, index) => {
    var selectedAnswerLabel = selectedAnswers[index];
    var correctAnswerLabel = question.answer;
    // console.log(selectedAnswerLabel, correctAnswerLabel);
    if (selectedAnswerLabel === correctAnswerLabel) {
      correctAnswers++;
    } else {
      // userData[0].grades.push(`${question.title} :  ${selectedAnswerLabel}`);
      userData[0].result.push([
        question.title,
        correctAnswerLabel,
        selectedAnswerLabel,
      ]);
    }
  });
  // console.log(correctAnswers, questions.length);

  // resultsDiv.textContent = `You answered ${correctAnswers} out of ${questions.length} questions correctly.`;
  // resultsDiv.textContent = `${correctAnswers}%`;
  userData[0].degree = `${((correctAnswers / questions.length) * 100).toFixed(
    1
  )}%`;
  // console.log(Object.keys(selectedAnswers).length == questions.length);
  // console.log(questions.length);
  // console.log(questions.length);
  // console.log(Math.fround(correctAnswers / questions.length) * 100);
  // console.log(userData[0].grads);
  // console.log((userData[0].degree = correctAnswers));
  if (Object.keys(selectedAnswers).length == questions.length) {
    Cookie.setCookie(
      "userData",
      JSON.stringify(userData),
      new Date("10/6/2025")
    );
    location.replace("result.html");
  } else {
    alert("Some Questions not answered yet");
  }
}

function showTimeoutPage() {
  window.location.href = "timeout.html";
}

window.onload = function () {
  if (!Cookie.hasCookie("userData") && !Cookie.getCookie("userStatus")) {
    location.replace("index.html");
  }
  document
    .getElementById("prev-button")
    .addEventListener("click", showPreviousQuestion);
  document
    .getElementById("next-button")
    .addEventListener("click", showNextQuestion);
  // document.getElementById("retry-button").addEventListener("click", () => {
  //   location.reload();
  // });
  getJsonData();
};

// window.addEventListener("beforeunload", (e) => {
//   e.preventDefault();
//   e.returnValue = "Changes you made may not be saved";
// });
// function stopReload() {
// }
// window.addEventListener("load", stopReload);
1;
