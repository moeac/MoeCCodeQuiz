var questions = document.querySelector("#question");
var answers1 = document.querySelector("#answers");
var startButton = document.querySelector("#start-button");
var choice = document.querySelectorAll(".choice");
var choiceA = document.querySelector("#choiceA");
var choiceB = document.querySelector("#choiceB");
var choiceC = document.querySelector("#choiceC");
var choiceD = document.querySelector("#choiceD");
var message = document.querySelector(".message");
var optionNumber = 0
var timer = document.querySelector(".timer-count");
var timerText = document.querySelector(".timer-text");
var timeLeft = 10;

function setTime() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = timeLeft;

        if (timeLeft === 1) {
            timerText.textContent = " second remaining";
        } else if (timeLeft === 0) {
            clearInterval(timerInterval);
            gameOver();
        }

    }, 1000);
}

var options = [" "]

var options1 = {
    question: 'QUESTION 1',
    answers: ["answer1A", "answer1B", "answer1C", "answer1D"],
    correctA: "answer1C",

};

var options2 = {
    question: 'QUESTION 2',
    answers: ["answer2A", "answer1B", "answer1C", "answer1D"],
    correctA: "answer1D",

};

var options3 = {
    question: 'QUESTION 3',
    answers: ["answer3A", "answer1B", "answer1C", "answer1D"],
    correctA: "answer1C",

};

var options4 = {
    question: 'QUESTION 4',
    answers: ["answer4A", "answer1B", "answer1C", "answer1D"],
    correctA: "answer1B",

};

var optionsArray = [
    options1,
    options2,
    options3,
    options4,
];



function displayOptions() {
    if (optionNumber >= optionsArray.length) {
        gameOver();
        return;
    }
    questions.textContent = optionsArray[optionNumber].question;
    for (var i = 0; i < optionsArray[optionNumber].answers.length; i++) {
        choice[i].textContent = optionsArray[optionNumber].answers[i];
    }
}

function correctAnswer(event) {
    event.preventDefault();
    
    var selected = event.target;
    if (selected.textContent === optionsArray[optionNumber].correctA) {
        message.textContent = "CORRECT";
        optionNumber++;
        
    } else {
        message.textContent = "WRONG";
        optionNumber++;
        
    }
    displayOptions();
}

function gameOver() {
    window.alert("game over");
}

function startQuestions() {
    setTime();
    hideButton();
    displayOptions();
    

}


function hideButton() {
    document.getElementById('start-button').style.display = "none";
}

startButton.addEventListener("click", startQuestions);

choiceA.addEventListener("click", correctAnswer);
choiceB.addEventListener("click", correctAnswer);
choiceC.addEventListener("click", correctAnswer);
choiceD.addEventListener("click", correctAnswer);