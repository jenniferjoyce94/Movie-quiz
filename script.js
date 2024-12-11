const container = document.querySelector(".container");
const quiz = document.querySelector(".quiz");
const theQuestion = document.querySelector("#theQuestion");
const answerContainer = document.querySelector("#answerContainer");
const nextBtn = document.querySelector(".nextBtn");
const results = document.querySelector("#results");
let darkMode = document.querySelector("#darkLightBtn");

const myQuestions = [
  {
    question: "The Academy Awards are also known as the Oscars.",
    answers: ["True", "False"],
    correctAnswers: ["True"],
    type: "true-false",
  },
  {
    question: "Who has hosted the Oscars the most times?",
    answers: ["Billy Crystal", "Bob Hope", "Ellen DeGeneres", "Hugh Jackman"],
    correctAnswers: ["Bob Hope"],
    type: "multiple-choice",
  },
  {
    question:
      "Which of these movies have won Best Picture? (You can select multiple answers)",
    answers: ["Titanic", "The Godfather", "Citizen Kane", "Forrest Gump"],
    correctAnswers: ["Titanic", "The Godfather", "Forrest Gump"],
    type: "checkbox",
  },
  {
    question: "Meryl Streep has won more Oscars than any other actor.",
    answers: ["True", "False"],
    correctAnswers: ["False"],
    type: "true-false",
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
  {
    question:
      "Which of these actors have won an Oscar for Best Actor? (You can select multiple answers)",
    answers: [
      "Leonardo DiCaprio",
      "Brad Pitt",
      "Tom Hanks",
      "Denzel Washington",
    ],
    correctAnswers: ["Leonardo DiCaprio", "Tom Hanks", "Denzel Washington"],
    type: "checkbox",
  },
  {
    question: "The first Oscars ceremony was held in 1929.",
    answers: ["True", "False"],
    correctAnswers: ["True"],
    type: "true-false",
  },
  {
    question: "Who won the Oscar for Best Actor at the 	2023 Oscars?",
    answers: [
      "Austin Butler (Elvis)",
      "Colin Farrell (The Banshees of Inisherin)",
      "Brendan Fraser (The Whale)",
      "Paul Mescal (Aftersun)",
    ],
    correctAnswers: ["Brendan Fraser (The Whale)"],
    type: "multiple-choice",
  },
  {
    question:
      "Which of these films were directed by Steven Spielberg? (You can select multiple answers)",
    answers: [
      "Jaws",
      "Schindler's List",
      "E.T. the Extra-Terrestrial",
      "Pulp Fiction",
    ],
    correctAnswers: ["Jaws", "Schindler's List", "E.T. the Extra-Terrestrial"],
    type: "checkbox",
  },
  {
    question:
      "Which animated movie was the first to be nominated for Best Picture?",
    answers: ["Toy Story", "Beauty and the Beast", "The Lion King", "Shrek"],
    correctAnswers: ["Beauty and the Beast"],
    type: "multiple-choice",
  },
  {
    question: "Which film is the most awarded in Oscars history?",
    answers: [
      "La La Land",
      "Titanic",
      "The Lord of the Rings: The Return of the King",
      "Ben-Hur",
    ],
    correctAnswers: ["The Lord of the Rings: The Return of the King"],
    type: "multiple-choice",
  },
  {
    question:
      "Which movies won the Big Five Oscars (Picture, Director, Actor, Actress, Screenplay)? (You can select multiple answers)",
    answers: [
      "The Silence of the Lambs",
      "Titanic",
      "One Flew Over the Cuckoo's Nest",
      "It Happened One Night",
    ],
    correctAnswers: [
      "The Silence of the Lambs",
      "One Flew Over the Cuckoo's Nest",
      "It Happened One Night",
    ],
    type: "checkbox",
  },
];

darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkLightBtn.innerHTML = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
});
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

function resetState() {
  nextBtn.style.display = "none";
  answerContainer.innerHTML = "";
  selectedAnswer = null;
}

function createAnswerButtons(answers) {
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answerBtn");
    button.addEventListener("click", () => selectAnswer(button));
    answerContainer.appendChild(button);
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
    answerContainer.appendChild(checkboxContainer);
  });
}

function selectAnswer(button) {
  if (myQuestions[questionIndex].type === "checkbox") {
    selectedAnswer = Array.from(
      answerContainer.querySelectorAll("input[type='checkbox']:checked")
    ).map((checkbox) => checkbox.value);

    if (selectedAnswer.length !== 0) {
      nextBtn.style.display = "block";
    } else {
      nextBtn.style.display = "none";
    }
    return;
  }
  Array.from(answerContainer.children).forEach((btn) => {
    btn.classList.remove("selected");
  });
  button.classList.add("selected");
  selectedAnswer = button.innerHTML;
  nextBtn.style.display = "block";
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
    resultColor = "darkred";
  } else if (getProcent >= 50 && getProcent <= 75) {
    resultMessage =
      "You know most movies, but maybe you fell asleep before the end!";
    resultColor = "darkorange";
  } else {
    resultMessage =
      "PERFECTION! You are like Quentin Tarantino and Steven Spielberg all in one person!";
    resultColor = "darkgreen";
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
  seeAnswers.innerHTML = "See your anwsers here";
  seeAnswers.classList.add("nextBtn");
  seeAnswers.style.display = "block";

  seeAnswers.addEventListener("click", () => {
    if (!document.querySelector(".answers-shown")) {
      const displayResult = showEndResults();
      displayResult.classList.add("answers-shown");
      results.appendChild(displayResult);
    }
    seeAnswers.disabled = "true";
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
