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
  },

  // Multiple Choice Questions
  {
    question: "Who has hosted the Oscars the most times?",
    answers: ["Billy Crystal", "Bob Hope", "Ellen DeGeneres", "Hugh Jackman"],
    correctAnswers: ["Bob Hope"],
  },

  // Checkbox Questions
  {
    question: "Which of these movies have won Best Picture?",
    answers: ["Titanic", "The Godfather", "Citizen Kane", "Forrest Gump"],
    correctAnswers: ["Titanic", "The Godfather", "Forrest Gump"],
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

function displayQuestion() {
  resetState();
  const currentQuiz = myQuestions[questionIndex];
  theQuestion.innerHTML = `${questionIndex + 1}. ${currentQuiz.question}`;

  currentQuiz.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.correctAnswers;
    button.classList.add("answerBtn");
    button.addEventListener("click", () => {
      selectAnswer(button);
    });
    alternativBtn.appendChild(button);
  });
}
function resetState() {
  nextBtn.style.display = "none";
  alternativBtn.innerHTML = "";
  selectedAnswer = null;
}

function selectAnswer(button) {
  Array.from(alternativBtn.children).forEach((btn) => {
    btn.classList.remove("selected");
  });
  button.classList.add("selected");
  selectedAnswer = button.innerHTML;
  nextBtn.style.display = "block";
}
nextBtn.addEventListener("click", () => {
  const currentQuiz = myQuestions[questionIndex];

  if (selectedAnswer && currentQuiz.correctAnswers.includes(selectedAnswer)) {
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
  results.innerHTML = `
    <h2>Quiz Completed</h2>
    <p>You scored ${score} out of ${myQuestions.length}!</p>
    <button onclick="startQuiz()">Restart</button>
  `;
  nextBtn.innerHTML = `Play again`;
  nextBtn.style.display = "block";
}

startQuiz();
