// index.js
function startQuiz() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

  // Validate name and email inputs
  if (nameInput.checkValidity() && emailInput.checkValidity()) {
      // Redirect to the quiz page
      window.location.href = "quiz-page.html";
  } else {
      // Display an error message or handle invalid input
      alert("Please enter valid name and email!");
  }
}

// index.js

const quizData = [
  {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
      correctAnswer: 0
  },
  {
    question: "Which programming language is commonly used for front-end development?",
    options: ["Java", "Python", "JavaScript", "Ruby"],
    correctAnswer: " JavaScript",
  },
  {
    question: "What does HTML stand for in the context of web development",
    options: ["HyperText Markup Language", "High-level Text Manipulation Language", "Hyperlink and Text Management Language", "Hyper Transfer Make Language"],
    correctAnswer: "HyperText Markup Language",
  },
  {
    question: "Which CSS property is used for changing the text color of an element?",
    options: ["color", "font-color", "text-color", "style-color"],
    correctAnswer: "color",
  },
  {
    question: "WHich of the following is not a valid HTML tag? ",
    options: ["<div>","<span>","<section>","<paragraph>",],
    correctAnswer: "<paragraph>",
  },
  {
    question: "What is the purpose of JavaScript in front-end development?",
    options: ["Styling web pages", "Creating and manipulating web content dynamically", "Defining page structure", "Managing server-side operations"],
    correctAnswer: "Creating and manipulating web content dynamically",
  },
  {
    question: "Which CSS property is used for adding space outside the borders of an element?",
    options: [
      "margin",
      "padding",
      "spacing",
      "border-spacing",
    ],
    correctAnswer: "margin",
  },
  {
    question: "Which of the following is a version control system commonly used in front-end development projects?",
    options: ["Git", "SVN (Subversion)", "Mercurial", "All of the above"],
    correctAnswer: "Git",
  },
  {
    question: "Who are the co-founders of Google?",
    options: [
      "Bill Gates and Steve Jobs",
      "Mark Zuckerberg and Dustin Moskovitz",
      "Larry Page and Sergey Brin",
      "Elon Musk and Jeff Bezos",
    ],
    correctAnswer: "Larry Page and Sergey Brin",
  },
  {
    question: "What is the name of our galaxy?",
    options: ["Andromeda", "Milky Way", "Sombrero", "Triangulum"],
    correctAnswer: "Milky Way",
  },
];

let currentQuestion = 0;
let score = 0;
let timer;

function displayQuestion() {
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");
  const currentQuizData = quizData[currentQuestion];

  questionContainer.innerHTML = `<p>${currentQuizData.question}</p>`;

  optionsContainer.innerHTML = "";
  currentQuizData.options.forEach((option, index) => {
      const optionElement = document.createElement("button");
      optionElement.innerText = option;
      optionElement.addEventListener("click", () => checkAnswer(index));
      optionsContainer.appendChild(optionElement);
  });
}

function checkAnswer(selectedIndex) {
  const currentQuizData = quizData[currentQuestion];

  if (selectedIndex === currentQuizData.correctAnswer) {
      score++;
  }

  showFeedback(selectedIndex === currentQuizData.correctAnswer);
}

function showFeedback(isCorrect) {
  const resultContainer = document.getElementById("result-container");

  resultContainer.innerHTML = isCorrect ? "Correct!" : "Incorrect!";
  resultContainer.style.color = isCorrect ? "#4caf50" : "#f44336";

  // Disable options after answering
  const options = document.querySelectorAll("#options-container button");
  options.forEach((option) => option.disabled = true);

  // Stop the timer
  clearInterval(timer);

  // Show next button
  document.getElementById("next-btn").style.display = "block";
}

function startTimer() {
  let timeRemaining = 10; // seconds

  timer = setInterval(() => {
      document.getElementById("timer").innerText = timeRemaining;

      if (timeRemaining === 0) {
          showFeedback(false);
      }

      timeRemaining--;
  }, 1000);
}

function nextQuestion() {
  // Enable options for the next question
  const options = document.querySelectorAll("#options-container button");
  options.forEach((option) => option.disabled = false);

  // Hide result and next button
  document.getElementById("result-container").innerHTML = "";
  document.getElementById("next-btn").style.display = "none";

  // Move to the next question
  currentQuestion++;

  if (currentQuestion < quizData.length) {
      displayQuestion();
      startTimer();
  } else {
      endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);

  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = `
      <h2>Your Score: ${score}/${quizData.length}</h2>
      <button onclick="location.reload()">Restart Quiz</button>
  `;
}

function submitQuiz() {
  clearInterval(timer);

  // Show submission modal or handle submission as needed
  alert("Quiz Submitted!");
}

// Start the quiz when the page loads
document.addEventListener("DOMContentLoaded", displayQuestion);
document.addEventListener("DOMContentLoaded", startTimer);
