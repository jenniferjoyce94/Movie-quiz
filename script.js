const container = document.querySelector(".container");
const quiz = document.querySelector(".quiz");
const theQuestion = document.querySelector("#theQuestion");
const alternativeBtn = document.querySelector("#alternativeBtn");
const nextBtn = document.querySelector(".nextBtn");
const results = document.querySelector("#results");

const myQuestions = [
  // True/False Questions
  {
    question: "The Academy Awards are also known as the Oscars.",
    answers: ["True", "False"],
    correctAnswers: ["True"],
    type: "true-false",
  },

  // Multiple Choice Questions
  {
    question: "Who has hosted the Oscars the most times?",
    answers: ["Billy Crystal", "Bob Hope", "Ellen DeGeneres", "Hugh Jackman"],
    correctAnswers: ["Bob Hope"],
    type: "multiple-choice",
  },

  // Checkbox Questions
  {
    question:
      "Which of these movies have won Best Picture? (You can select multiple answers)",
    answers: ["Titanic", "The Godfather", "Citizen Kane", "Forrest Gump"],
    correctAnswers: ["Titanic", "The Godfather", "Forrest Gump"],
    type: "checkbox",
  },

  {
    question:
      "Which directors have won multiple Best Director Oscars? (You can select multiple answers)",
    answers: [
      "Steven Spielberg",
      "Clint Eastwood",
      "Kathryn Bigelow",
      "Martin Scorsese",
    ],
    correctAnswers: ["Steven Spielberg", "Clint Eastwood"],
    type: "checkbox",
  },
];

let questionIndex;
let score;
let selectedAnswer;

function startQuiz() {
  questionIndex = 0;
  score = 0;
  results.innerHTML = "";
  nextBtn.innerHTML = "Next";
  quiz.style.display = "block";
  displayQuestion();
}

let darkMode = document.querySelector("#darkLightBtn");
darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkLightBtn.innerHTML = document.body.classList.contains("dark-mode")
    ? "🌙"
    : "☀️";
});

function displayQuestion() {
  resetState();
  const currentQuestion = myQuestions[questionIndex];
  theQuestion.textContent = `${questionIndex + 1}. ${currentQuestion.question}`;

  if (currentQuestion.type === "checkbox") {
    createCheckboxOptions(currentQuestion.answers);
  } else {
    createAnswerButtons(currentQuestion.answers);
  }
}

function createAnswerButtons(answers) {
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answerBtn");
    button.addEventListener("click", () => selectAnswer(button));
    alternativeBtn.appendChild(button);
  });
}

function createCheckboxOptions(answers) {
  answers.forEach((answer) => {
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("checkbox-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = answer;
    checkbox.id = `checkbox-${answer}`;
    checkbox.addEventListener("click", () => selectAnswer(checkbox));

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = answer;

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
    alternativeBtn.appendChild(checkboxContainer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  alternativeBtn.innerHTML = "";
  selectedAnswer = null;
}

function selectAnswer(button) {
  if (
    myQuestions[questionIndex].type === "multiple-choice" ||
    myQuestions[questionIndex].type === "true-false"
  ) {
    Array.from(alternativeBtn.children).forEach((btn) => {
      btn.classList.remove("selected");
    });
    button.classList.add("selected");
    selectedAnswer = button.innerHTML;
    nextBtn.style.display = "block";
  } else if (myQuestions[questionIndex].type === "checkbox") {
    selectedAnswer = Array.from(
      alternativeBtn.querySelectorAll("input[type='checkbox']:checked")
    ).map((checkbox) => checkbox.value);
    if (selectedAnswer.length !== 0) {
      nextBtn.style.display = "block";
    } else {
      nextBtn.style.display = "none";
    }
  }
}

nextBtn.addEventListener("click", () => {
  const currentQuiz = myQuestions[questionIndex];
  let isCorrect = false;
  if (currentQuiz.type === "checkbox") {
    isCorrect =
      selectedAnswer &&
      selectedAnswer.length === currentQuiz.correctAnswers.length &&
      selectedAnswer.every((ans) => currentQuiz.correctAnswers.includes(ans));
    currentQuiz.yourAnswer = selectedAnswer;
  } else {
    isCorrect =
      selectedAnswer && currentQuiz.correctAnswers.includes(selectedAnswer);
    currentQuiz.yourAnswer = [selectedAnswer];
  }
  if (isCorrect) {
    score++;
  }
  questionIndex++;
  if (questionIndex < myQuestions.length) {
    displayQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  resetState();
  quiz.style.display = "none";

  const allQuestions = myQuestions.length;
  const getProcent = (score / allQuestions) * 100;

  let resultMessage = "";
  let resultColor = "";

  if (getProcent < 50) {
    resultMessage = "Oops! Seems like you had a blackout during the movie.";
    resultColor = "red";
  } else if (getProcent >= 50 && getProcent <= 75) {
    resultMessage =
      "You know most things, but maybe you missed the end credits!";
    resultColor = "orangered";
  } else {
    resultMessage =
      "PERFECTION! You are like Quentin Tarantino and Steven Spielberg all in one person!";
    resultColor = "green";
  }

  results.innerHTML = `
  <h2> Your Result:</h2>  
    <p style="color: ${resultColor};">${resultMessage}
    You got ${score} out ${allQuestions} questions. </p>
  `;

  const playAgain = document.createElement("button");
  playAgain.textContent = "Play again";
  playAgain.classList.add("nextBtn");
  playAgain.style.display = "block";
  playAgain.onclick = startQuiz;

  const seeAnswers = document.createElement("button");
  seeAnswers.innerHTML = "See you anwsers here";
  seeAnswers.classList.add("nextBtn");
  seeAnswers.style.display = "block";
  seeAnswers.addEventListener("click", () => {
    console.log("Click");
    const displayResult = showEndResults();
    results.appendChild(displayResult);
  });

  results.appendChild(seeAnswers);
  results.appendChild(playAgain);
}

startQuiz();

function showEndResults() {
  const resultContainer = document.createElement("div");

  myQuestions.forEach((question) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("questionResult");

    const questionTitle = document.createElement("h4");
    questionTitle.textContent = question.question;
    questionDiv.appendChild(questionTitle);

    const correctAnswers = document.createElement("div");
    correctAnswers.textContent =
      "Correct Answer: " + question.correctAnswers.join(", ");
    questionDiv.appendChild(correctAnswers);

    const yourAnswers = document.createElement("div");
    const userAnswers = Array.isArray(question.yourAnswer)
      ? question.yourAnswer
      : [];
    yourAnswers.textContent =
      "Your Answer: " + (userAnswers.length ? userAnswers.join(", ") : "None");
    questionDiv.appendChild(yourAnswers);

    resultContainer.appendChild(questionDiv);
  });

  return resultContainer;
}
