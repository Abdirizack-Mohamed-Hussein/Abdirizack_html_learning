const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        // question: "Q. Which of the following is not a CSS box model property?"
        // ,
        question: "Q. When Did You meet Abdirizack?",
        // choices: ["margin", "padding", "border-radius", "border-collapse"],
        choices: ["23rd June", "Don't Remember", "After 3 months", "Hahaha"],
        answer: "After 3 months"
    },
    {
        question: "What is Abdirizack's favorite color?",
        choices: ["Red","Blue","Green",'Yellow',],
        answer: "Blue"
    },
    {
        question: "Q. When is Abdirizack's birthday?",
        choices: ["January 1", "April 15", " June 23", " October 25"],
        answer: "June 23"
    },
    {
        question: "Q. What is Abdirizack's favorite food?",
        choices: ["Pizza.", "Pasta.", "chapo.", " Habiba."],
        answer: "Habiba."
    },
    {
        question: "Q. Who introduced Daily Adhkar?",
        choices: ["Abdirizack.", " Habiba."],
        answer: "Habiba."
    },
    {
        question: "Q.Abdirizack Introduced  the following to You except?",
        choices: ["Gym.", "Daily Adhkar.", "Morning Adhkar.", " Evening Adhkar."],
        answer: "Daily Adhkar."
    },
    {
        question: "Q.Who is Your favorite person to You?",
        choices: ["Abdirizack.", "Totoo.", "Fatu.", " I dont Know."],
        answer: "Abdirizack."
    },
    {
        question: "Q.Which sport does Abdirizack enjoy the most?",
        choices: [" Soccer.", "Basketball.", " Tennis.", " Swimming."],
        answer: "Soccer."
    },
    {
        question: "Q.What is Abdirizack's favorite hobby?",
        choices: [" Painting.", "Cooking.", " Playing video games.", " Gym."],
        answer: "Gym."
    },
    {
        question: "Q.Which animal does Abdirizack like the most?",
        choices: [" Dog.", "Cat.", " Rabbit.", " Habiba."],
        answer: "Habiba."
    },
    {
        question: "Q.What is Abdirizack's favorite holiday?",
        choices: [" Eid al-Fitr.", " Diwali", " Christmas"],
        answer: "Eid al-Fitr."
    },
    {
        question: "Q.Do You Love Me?",
        choices: [" Yes.", " Yess.", " YESSSSSSS."],
        answer:" YESSSSSSS."
    },



];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
}); 