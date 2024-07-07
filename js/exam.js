import { Cookie } from "./cookies.js";
import { Question } from "./questions.js";
import { User } from "./user.js";


window.onload = function () {
  console.log("test");
  if (!Cookie.hasCookie("userData") && !Cookie.getCookie("userStatus")) {
    location.replace("index.html");
  }
};

var quizData = new Question("Which islands are coral-covered in the Bay of Bengal?","Maldives","Lakshadweep","Fiji","Andaman and Nicobar")
console.log(quizData);


const quiz = document.getElementById("quiz");
const results = document.getElementById("results");
const submitButton = document.getElementById("submit");

function loadQuiz() {
  const output = [];
  quizData.forEach((currentQuestion, questionNumber) => {
    const answers = [];
    for (letter in currentQuestion) {
      if (letter !== "question" && letter !== "correct") {
        answers.push(
          `<label>
                      <input type="radio" name="question${questionNumber}" value="${letter}">
                      ${currentQuestion[letter]}
                  </label>`
        );
      }
    }
    output.push(
      `<div class="question">${currentQuestion.question}</div>
          <div class="answers">${answers.join("")}</div>`
    );
  });
  quiz.innerHTML = output.join("");
}

function showResults() {
  const answerContainers = quiz.querySelectorAll(".answers");
  let numCorrect = 0;

  quizData.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correct) {
      numCorrect++;
      answerContainers[questionNumber].style.color = "green";
    } else {
      answerContainers[questionNumber].style.color = "red";
    }
  });

  results.innerHTML = `${numCorrect} out of ${quizData.length}`;
}

// submitButton.addEventListener('click', showResults);

// loadQuiz();
