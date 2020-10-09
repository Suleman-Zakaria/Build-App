const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Which of the following is not a type of machine learning?",
    choice1: "Unsupervised Learning",
    choice2: "Reinforcement Leaning",
    choice3: "Distance Learning",
    choice4: "Supervised learning",
    answer: 3
  },
  {
    question:"What is the capital of Ghana?",
    choice1: "Greater Accra",
    choice2: "Kumasi",
    choice3: "Accra",
    choice4: "Gold Coast",
    answer: 3
  },
  {
    question: " Which of the following is a machine learning algorithm?",
    choice1: "Decision Forest",
    choice2: "Random Tree",
    choice3: "Pythogora's Theorem",
    choice4: "Decision Tree",
    answer: 4
  }
];

/* Setting the bonus reward and maximum number of questions to be answered*/
//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  
  /*Filling the status bar using the percentage of anwereed question*/
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
	
/*Setting the timer for transition from one quetion to the next*/
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
/*Increament of the score*/
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();