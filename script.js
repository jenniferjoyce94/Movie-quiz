const container = document.querySelector(".container");
const quiz = document.querySelector(".quiz");
const theQuestion = document.querySelector("#theQuestion");
const alternativBtn = document.querySelector("#alternativBtn");
const nextBtn = document.querySelector(".nextBtn");
const results = document.querySelector("#results");

const myQuestions = [
  // True/False Questions
  {
    question: "The Academy Awards are also known as the Oscars.",
    answers: ["True", "False"],
    correctAnswers: ["True"],
    yourAnswer: [],
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
    question: "Which of these movies have won Best Picture?",
    answers: ["Titanic", "The Godfather", "Citizen Kane", "Forrest Gump"],
    correctAnswers: ["Titanic", "The Godfather", "Forrest Gump"],
    type: "checkbox",
  },

  {
    question: "Which directors have won multiple Best Director Oscars?",
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

let questionIndex = 0;
let score = 0;
let selectedAnswer = null;

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
});

function displayQuestion() {
  resetState();
  const currentQuestion = myQuestions[questionIndex];
  theQuestion.textContent = `${questionIndex + 1}. ${currentQuestion.question}`;

  if (
    currentQuestion.type === "muliple-choice" ||
    currentQuestion.type === "true-false"
  ) {
    createAnswerButtons(currentQuestion.answers);
  } else if (currentQuestion.type === "checkbox") {
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
    alternativBtn.appendChild(button);
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
    alternativBtn.appendChild(checkboxContainer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  alternativBtn.innerHTML = "";
  selectedAnswer = null;
}

function selectAnswer(button) {
  if (
    myQuestions[questionIndex].type === "multiple-choice" ||
    myQuestions[questionIndex].type === "true-false"
  ) {
    Array.from(alternativBtn.children).forEach((btn) => {
      btn.classList.remove("selected");
    });
    button.classList.add("selected");
    selectedAnswer = button.innerHTML;
    nextBtn.style.display = "block";
  } else if (myQuestions[questionIndex].type === "checkbox") {
    selectedAnswer = Array.from(
      alternativBtn.querySelectorAll("input[type='checkbox']:checked")
    ).map((checkbox) => checkbox.value);
    if (selectedAnswer.length !== 0) {
      nextBtn.style.display = "block";
    } else {
      console.log("test");
      nextBtn.style.display = "none";
    }
  }
}

nextBtn.addEventListener("click", () => {
  const currentQuiz = myQuestions[questionIndex];
  if (
    currentQuiz.type === "multiple-choice" ||
    currentQuiz.type === "true-false"
  ) {
    if (selectedAnswer && currentQuiz.correctAnswers.includes(selectedAnswer)) {
      score++;
    }
  } else if (currentQuiz.type === "checkbox") {
    const isCorrect =
      selectedAnswer &&
      selectedAnswer.length === currentQuiz.correctAnswers.length &&
      selectedAnswer.every((ans) => currentQuiz.correctAnswers.includes(ans));
    if (isCorrect) {
      score++;
    }
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
  seeAnswers.onclick = () => {
    const displayResult = showEndResults();
    results.appendChild(displayResult);
  };

  results.appendChild(seeAnswers);
  results.appendChild(playAgain);
}

startQuiz();

// const showEndResults = ()=>{
// const resultContainer = document.createElement("div");

// myQuestions.forEach((question) => {
//   const questionDiv = createElement("div");
//   questionDiv.classList.add("questionResult");

//   const correctQuestion = document.createElement("div");
//   questionDiv.appendChild()
// });
// }
