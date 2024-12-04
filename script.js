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
  results.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>You scored ${score} out of ${myQuestions.length}!</p>
  `;

  const playAgain = document.createElement("button");
  playAgain.textContent = "Play again";
  playAgain.classList.add("nextBtn");
  playAgain.style.display = "block";
  playAgain.onclick = startQuiz;
  const showResults = document.createElement("button");
  showResults.textContent = "Show result";
  showResults.classList.add("nextBtn");
  showResults.style.display = "block";
  showResults.onclick = () => {
    const result = showEndResults();
    container.appendChild(result);
  };
  playAgain.onclick = startQuiz;
  results.appendChild(playAgain);
  results.appendChild(showResults);
}

startQuiz();

function showEndResults() {
  const resultsContainer = document.createElement("div");

  myQuestions.forEach((question) => {
    console.log(question);
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-result");

    const correctAnswersTitle = document.createElement("h4");
    correctAnswersTitle.textContent = "Correct Answers:";
    questionDiv.appendChild(correctAnswersTitle);

    question.correctAnswers.forEach((correctAnswer) => {
      const correctAnswerElement = document.createElement("p");
      correctAnswerElement.textContent = correctAnswer.value;
      questionDiv.appendChild(correctAnswerElement);
    });

    const yourAnswersTitle = document.createElement("h4");
    yourAnswersTitle.textContent = "Your Answers:";
    questionDiv.appendChild(yourAnswersTitle);

    question.yourAnswers.forEach((yourAnswer) => {
      const yourAnswerElement = document.createElement("p");
      yourAnswerElement.textContent = yourAnswer.value;
      questionDiv.appendChild(yourAnswerElement);
    });

    resultsContainer.appendChild(questionDiv);
  });

  return resultsContainer;
}
