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
    type: "multiple-choice",
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

function displayQuestion() {
  resetState();
  const currentQuiz = myQuestions[questionIndex];
  theQuestion.innerHTML = `${questionIndex + 1}. ${currentQuiz.question}`;

  if (currentQuiz.type === "multiple-choice") {
    currentQuiz.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer;
      button.classList.add("answerBtn");
      button.addEventListener("click", () => selectAnswer(button));
      alternativBtn.appendChild(button);
    });
  } else if (currentQuiz.type === "checkbox") {
    currentQuiz.answers.forEach((answer) => {
      const checkboxContainer = document.createElement("div");
      checkboxContainer.classList.add("checkbox-container");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = answer;
      checkbox.id = `checkbox-${answer}`;

      const label = document.createElement("label");
      label.htmlFor = `checkbox-${answer}`;
      label.innerText = answer;

      checkboxContainer.appendChild(checkbox);
      checkboxContainer.appendChild(label);
      alternativBtn.appendChild(checkboxContainer);
    });
  }
}
function resetState() {
  nextBtn.style.display = "none";
  alternativBtn.innerHTML = "";
  selectedAnswer = null;
}

function selectAnswer(button) {
  if (myQuestions[questionIndex].type === "multiple-choice") {
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
  }
}

nextBtn.addEventListener("click", () => {
  const currentQuiz = myQuestions[questionIndex];

  if (currentQuiz.type === "multiple-choice") {
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
  results.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>You scored ${score} out of ${myQuestions.length}!</p>
  `;

  const playAgain = document.createElement("button");
  playAgain.textContent = "Play again";
  playAgain.classList.add("nextBtn");
  playAgain.style.display = "block";
  playAgain.onclick = startQuiz;
  results.appendChild(playAgain);
}

startQuiz();

// function scorePlayBack (){
//   score.style.display ="block";
//   let scoreResult = math.round(100 * score/question.length);

// }
