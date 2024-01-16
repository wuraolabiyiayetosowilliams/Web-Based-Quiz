// Sample quiz data
const quizData = [
    {
      question: "What is the primary purpose of front-end development?",
      options: ["Database Management", "User Interface Design", "Server-side scripting", "Network security"],
      correctAnswer: "User Interface Design",
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
  
  // Set quiz duration in minutes
  const quizDuration = 30;
  let currentQuestionIndex = 0;
  let timeRemaining = quizDuration;
  let timer;
  let score = 0;
  let quizCompleted = false;
  
  document.addEventListener("DOMContentLoaded", startQuiz);
  
  function startQuiz() {
    const userName = localStorage.getItem("userName");
  
    if (!userName || quizCompleted) {
      alert("Please go back to the home page and start the quiz.");
      window.location.href = "index.html";
      return;
    }
  
    displayQuestion();
    startTimer();
  }
  function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
  
    questionContainer.innerHTML = quizData[currentQuestionIndex].question;
  
    optionsContainer.innerHTML = "";
    for (const option of quizData[currentQuestionIndex].options) {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => selectOption(option);
      optionsContainer.appendChild(button);
    }
  }
  function selectOption(selectedOption) {
    clearTimeout(timer);
  
    const resultContainer = document.getElementById("result-container");
    const optionsContainer = document.getElementById("options-container");
    const correctAnswer = quizData[currentQuestionIndex].correctAnswer;
  
    for (const button of optionsContainer.children) {
      if (button.textContent === selectedOption) {
        button.classList.add("selected");
      }
      button.disabled = true;
    }
  
    if (selectedOption === correctAnswer) {
      resultContainer.textContent = "Correct!";
      score++;
    } else {
      resultContainer.textContent = `Incorrect! The correct answer is: ${correctAnswer}`;
  
      for (const button of optionsContainer.children) {
        if (button.textContent === correctAnswer) {
          button.classList.add("correct");
        }
      }
    }
  
    document.getElementById("submit-btn").disabled = true; // Disable submit button
  
    if (currentQuestionIndex < quizData.length - 1) {
      setTimeout(() => {
        resetOptions(optionsContainer);
        resultContainer.textContent = "";
        currentQuestionIndex++;
        displayQuestion();
        document.getElementById("submit-btn").disabled = false; // Enable submit button for the next question
        startTimer();
      }, 2000);
    } else {
      setTimeout(() => {
        endQuiz();
      }, 2000);
    }
  }
  
  function resetOptions(optionsContainer) {
    for (const button of optionsContainer.children) {
      button.classList.remove("selected", "correct");
      button.disabled = false;
    }
  }
  
  function startTimer() {
    const timeElement = document.getElementById("time");
    timeElement.textContent = timeRemaining;
  
    timer = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        timeElement.textContent = timeRemaining;
      } else {
        endQuiz();
      }
    }, 2000);
  }
  
  function endQuiz() {
    clearInterval(timer);
    const quizContainer = document.getElementById("quiz-container");
    const resultContainer = document.getElementById("result-container");
  
    const userName = localStorage.getItem("userName");
  
    resultContainer.innerHTML = `<div id="result-container">Quiz completed, ${userName}! Your total score is: ${score}/${quizData.length}</div>`;
  
    localStorage.removeItem("userName");
  
    setTimeout(() => {
      window.location.href = "index.html";
    }, 5000);
  }