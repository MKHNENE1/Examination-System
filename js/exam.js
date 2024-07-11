// Define global variables
var questions = [];
var currentQuestionIndex = 0;
var selectedAnswers = {};
var timer;
var examDuration = 600; // 10 minutes in seconds

// Fetch and load the questions
async function getJsonData() {
    try {
        
        var res = await fetch("./json/questions.json");
        var resp = await res.json();
        resp.forEach(function (el) {
            var obj = {
                title: el.question,
                a: el.A,
                b: el.B,
                c: el.C,
                d: el.D,
                answer: el.answer,
                flag: false
            };
            questions.push(obj);
        });
        displayQuestion(currentQuestionIndex);
        startTimer(examDuration);
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

// Display a single question based on the current index
function displayQuestion(index) {
    var questionnaireDiv = document.getElementById('questionnaire');
    questionnaireDiv.innerHTML = ""; // Clear previous question

    if (index < 0 || index >= questions.length) return;

    var el = questions[index];

    var fieldset = document.createElement("fieldset");
    fieldset.setAttribute("id", `step${index + 1}`);

    var questionHeader = document.createElement("h1");
    questionHeader.classList.add('question');
    questionHeader.textContent = el.title;

    var optionsDiv = document.createElement("div");
    optionsDiv.classList.add('options', 'd-flex', 'flex-wrap', 'justify-content-between');

    var option1 = createAnswerOption(el.a, `op${index + 1}`, 'A');
    var option2 = createAnswerOption(el.b, `op${index + 1}`, 'B');
    var option3 = createAnswerOption(el.c, `op${index + 1}`, 'C');
    var option4 = createAnswerOption(el.d, `op${index + 1}`, 'D');

    optionsDiv.appendChild(option1);
    optionsDiv.appendChild(option2);
    optionsDiv.appendChild(option3);
    optionsDiv.appendChild(option4);

    var flagButton = document.createElement('button');
    flagButton.textContent = el.flag ? 'Unflag' : 'Flag'; // Change button text based on flag status
    flagButton.classList.add('btn', 'btn-warning', 'flag-button');
    flagButton.addEventListener('click', () => toggleFlagQuestion(index));

    fieldset.appendChild(questionHeader);
    fieldset.appendChild(optionsDiv);
    fieldset.appendChild(flagButton);

    questionnaireDiv.appendChild(fieldset);

    // Update the state of navigation buttons
    document.getElementById('prev-button').style.display = index === 0 ? 'none' : 'inline-block';
    document.getElementById('next-button').disabled = !(index in selectedAnswers); // Disable Next button if no answer is selected
    document.getElementById('next-button').textContent = index === questions.length - 1 ? 'Submit' : 'Next';

    // Enable Next button only if an answer is selected
    var radioButtons = optionsDiv.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            selectedAnswers[index] = radio.value; // Store the selected answer label ("A", "B", "C", "D")
            document.getElementById('next-button').disabled = false;
        });

        // Retain the selected answer when navigating back
        if (selectedAnswers[index] && radio.value === selectedAnswers[index]) {
            radio.checked = true;
        }
    });

    updateFlaggedQuestionsSidebar();
}

// Create the answer option
function createAnswerOption(answerText, questionName, optionLabel) {
    var optionDiv = document.createElement('div');
    optionDiv.classList.add('option', 'animate');

    var input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', questionName);
    input.setAttribute('value', optionLabel); // Store the option label (e.g., "A", "B", "C", "D") as value

    var label = document.createElement('label');
    label.textContent = answerText;

    optionDiv.appendChild(input);
    optionDiv.appendChild(label);

    return optionDiv;
}

// Navigation functions
function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    }
}

// Toggle flag for a question
function toggleFlagQuestion(index) {
    questions[index].flag = !questions[index].flag;
    updateFlaggedQuestionsSidebar();
}

// Update the flagged questions sidebar
function updateFlaggedQuestionsSidebar() {
    var sidebar = document.getElementById('flagged-questions');
    sidebar.innerHTML = ''; // Clear previous list

    questions.forEach((question, index) => {
        if (question.flag) {
            var card = document.createElement('div');
            card.classList.add('flagged-question-card');
            card.textContent = question.title;
            card.addEventListener('click', () => {
                currentQuestionIndex = index;
                displayQuestion(index);
            });
            sidebar.appendChild(card);
        }
    });
}

// Start the timer
function startTimer(duration) {
    var timerDiv = document.getElementById('time-remaining');
    var minutes, seconds;

    timer = setInterval(function () {
        minutes = parseInt(duration / 60, 10);
        seconds = parseInt(duration % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDiv.textContent = minutes + ":" + seconds;

        if (--duration < 0) {
            clearInterval(timer);
            showTimeoutPage(); // Redirect to timeout page
        }
    }, 1000);
}

// Show the results
function showResults() {
    clearInterval(timer); // Stop the timer
    document.getElementById('results-screen').classList.remove('d-none');
    var resultsDiv = document.getElementById('results');
    var correctAnswers = 0;

    questions.forEach((question, index) => {
        var selectedAnswerLabel = selectedAnswers[index]; // Get the selected answer label
        var correctAnswerLabel = question.answer; // Assuming question.answer is the correct answer label (e.g., "A", "B", "C", "D")
        console.log(selectedAnswerLabel, correctAnswerLabel);
        if (selectedAnswerLabel === correctAnswerLabel) {
            correctAnswers++;
        }
    });

    resultsDiv.textContent = `You answered ${correctAnswers} out of ${questions.length} questions correctly.`;
}

// Redirect to timeout page
function showTimeoutPage() {
    window.location.href = "timeout.html";
}

// Event listeners for navigation buttons
window.onload = function () {
    document.getElementById('prev-button').addEventListener('click', showPreviousQuestion);
    document.getElementById('next-button').addEventListener('click', showNextQuestion);
    document.getElementById('retry-button').addEventListener('click', () => {
        location.reload(); // Reload the page to restart the exam
    });
    getJsonData();
};
