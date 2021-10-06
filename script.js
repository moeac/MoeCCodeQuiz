var questionsEl = document.getElementById("question");
var answersEl = document.getElementById("answers");
var answersContainer = document.getElementById("answers-container");
var qaContainer = document.querySelector(".qa-container");
var gameOverDisplay = document.getElementById("game-over");
var userID = document.getElementById("user-id");
var scoreEl = document.getElementById("score");
var highscoreEl = document.getElementById("hs-list");
var buttonStart = document.getElementById("start-button");
var buttonRedo = document.getElementById("redo-button");
var buttonClear = document.getElementById("clear-button");
var buttonSubmit = document.getElementById("submit-button");
var choiceEl = document.querySelectorAll(".choice");
var choiceA = document.getElementById("choiceA");
var choiceB = document.getElementById("choiceB");
var choiceC = document.getElementById("choiceC");
var choiceD = document.getElementById("choiceD");
var message1 = document.getElementById("message-1");
var message2 = document.getElementById("message-2");
var message3 = document.getElementById("message-3");
var timer = document.querySelector(".timer-count");
var timerText = document.querySelector(".timer-text");
var questionNumber = 0
var timeLeft = 60;
var timerInterval; 
var score = 0;
var highscoreList = [];


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


answersContainer.style.visibility = "hidden";
gameOverDisplay.hidden = true;

function clearScores() {
    highscoreEl.textContent = "";
    highscoreList = [];
}

function displayHS() {
    highscoreEl.textContent = "";
    for (var i = 0; i < highscoreList.length; i++) {
        var div = document.createElement("div");
        div.textContent = highscoreList[i].name + " <-----> " + highscoreList[i].hScore;
        highscoreEl.appendChild(div);
    }
}

function submitScore(event) {
    event.preventDefault();
    var initials = userID.value;
    var userHS = {
        name: initials,
        hScore: score,
    };
    highscoreList.push(userHS);
    buttonSubmit.style.visibility ="hidden";
    displayHS();
}

function gameOver() {
    qaContainer.hidden = true;
    gameOverDisplay.hidden = false;
    message1.textContent = "GAME OVER!";
    scoreEl.textContent = "You got a score of: " + score;
    clearInterval(timerInterval);

}

function setTime() {
    timeLeft = 60;
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

function scoreDisplay() {
    scoreEl.textContent = "Current Score: " + score;
}

function hideMessage() {
    message2.textContent = " ";
    
}

function hideButton() {
    buttonStart.style.display = "none";
}

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
        message2.textContent = "CORRECT";
        message2.style.color = "green";
        questionNumber++;
        setTimeout(hideMessage, 350);
        setTimeout(function(){selected.style.color = "black"}, 350);
        setTimeout(displayQuestion, 350);
        score++;

    } else {
        selected.style.color = "red";
        message2.textContent = "WRONG";
        message2.style.color = "red";
        questionNumber++;
        setTimeout(hideMessage, 350);
        setTimeout(function(){selected.style.color = "black"}, 350);
        setTimeout(displayQuestion, 350);
    }
}

function resetValues() {
    questionNumber = 0;
    score = 0;
    answersContainer.style.visibility = "hidden";
    gameOverDisplay.hidden = true;
    qaContainer.hidden = false;
    answersContainer.style.visibility = "visible";
    buttonSubmit.style.visibility = "visible"; 
}


function startQuestions() {
    resetValues();
    setTime();
    hideButton();
    displayQuestion();
}




buttonStart.addEventListener("click", startQuestions);
buttonRedo.addEventListener("click", startQuestions);
buttonSubmit.addEventListener("click", submitScore);
buttonClear.addEventListener("click", clearScores);

choiceA.addEventListener("click", correctAnswer);
choiceB.addEventListener("click", correctAnswer);
choiceC.addEventListener("click", correctAnswer);
choiceD.addEventListener("click", correctAnswer);