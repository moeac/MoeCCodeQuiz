var questionsEl = document.getElementById("question");
var answersEl = document.getElementById("answers");
var buttonEl = document.getElementById("start-button");
var choiceEl = document.querySelectorAll(".choice");
var choiceA = document.getElementById("choiceA");
var choiceB = document.getElementById("choiceB");
var choiceC = document.getElementById("choiceC");
var choiceD = document.getElementById("choiceD");
var message = document.querySelector(".message");
var message2 = document.querySelector(".message2");
var questionNumber = 0
var timer = document.querySelector(".timer-count");
var timerText = document.querySelector(".timer-text");
var timeLeft = 5;
var qaContainer = document.querySelector(".qa-container");
var timerInterval; 

function setTime() {
    timerInterval = setInterval(function() {
    timeLeft--;
    timer.textContent = timeLeft;

    if (timeLeft === 1) {
        timerText.textContent = " second remaining";
    } else if (timeLeft === 0) {
        timerText.textContent = " seconds remaining";
        clearInterval(timerInterval);
        gameOver();
    }
    if (timeLeft <= 10) {
        timer.style.color ="red";
        timerText.style.color ="red";
      }
}, 1000);
}

var question1 = {
    question: 'QUESTION 1',
    answers: ["answer1A", "answer1B", "answer1C", "answer1D"],
    correctA: "answer1C",

};

var question2 = {
    question: 'QUESTION 2',
    answers: ["answer2A", "answer1B", "answer1C", "answer1D"],
    correctA: "answer1D",

};

var question3 = {
    question: 'QUESTION 3',
    answers: ["answer3A", "answer1B", "answer1C", "answer1D"],
    correctA: "answer1C",

};

var question4 = {
    question: 'QUESTION 4',
    answers: ["answer4A", "answer1B", "answer1C", "answer1D"],
    correctA: "answer1B",

};


var questionList = [
    question1,
    question2,
    question3,
    question4,
];



function displayQuestion() {
    if (questionNumber === questionList.length) {
        gameOver();
        return;
    }
    questionsEl.textContent = questionList[questionNumber].question;
    for (var i = 0; i < questionList[questionNumber].answers.length; i++) {
        choiceEl[i].textContent = questionList[questionNumber].answers[i];
    }
}

function correctAnswer(event) {
    event.preventDefault();
    
    var selected = event.target;
    if (selected.textContent === questionList[questionNumber].correctA) {
        selected.style.color = "green";
        message.textContent = "CORRECT";
        message.style.color = "green";
        questionNumber++;
        setTimeout(hideMessage, 500);
        setTimeout(function(){selected.style.color = "black"}, 500);
        setTimeout(displayQuestion, 500);

    } else {
        selected.style.color = "red";
        message.textContent = "WRONG";
        message.style.color = "red";
        questionNumber++;
        setTimeout(hideMessage, 500);
        setTimeout(function(){selected.style.color = "black"}, 500);
        setTimeout(displayQuestion, 500);
    }
    
}

function hideMessage() {
    message.textContent = " ";
    choiceEl.textContent = "fk";
}

function gameOver() {
    
    qaContainer.hidden = true;
    message2.textContent = "GAME OVER";
    clearInterval(timerInterval);
}

function startQuestions() {
    setTime();
    hideButton();
    displayQuestion();

}


function hideButton() {
    document.getElementById('start-button').style.display = "none";
}

buttonEl.addEventListener("click", startQuestions);

choiceA.addEventListener("click", correctAnswer);
choiceB.addEventListener("click", correctAnswer);
choiceC.addEventListener("click", correctAnswer);
choiceD.addEventListener("click", correctAnswer);