// all the fun variables
var questionsEl = document.getElementById("question");
var answersEl = document.getElementById("answers");
var answersContainer = document.getElementById("answers-container");
var qaContainer = document.querySelector(".qa-container");
var gameOverDisplay = document.getElementById("game-over");
var userID = document.getElementById("user-id");
var scoreEl = document.getElementById("score");
var currentScore = document.getElementById("current-score");
var highscoreEl = document.getElementById("hs-list");
var buttonStart = document.getElementById("start-button");
var buttonRedo = document.getElementById("redo-button");
var buttonClear = document.getElementById("clear-button");
var buttonSubmit = document.getElementById("submit-button");
var choiceEl = document.querySelectorAll(".choice");
var viewScore = document.getElementById("high-score");
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
var timeLeft = 20;
var timerInterval; 
var score = 0;
var highscoreList = [];

// list of questions and answer options
var question1 = {
    question: 'Which of these is NOT a programming language?',
    answers: ["Python", "JavaScript", "C#", "HTML"],
    correctA: "HTML",

};

var question2 = {
    question: 'Which of these is NOT an operator in JavaScript?',
    answers: ["+", "-", "[ ]", "*"],
    correctA: "[ ]",

};

var question3 = {
    question: 'Which is the correct basic "for" loop iteration in JavaScript?',
    answers: ["(i = 0; i < variable.length; i++)", "(i = 0; i > variable.length; i++)", "(i = 0; i < variable.length; i--)", "(i = 0; i > variable.length; i--)"],
    correctA: "(i = 0; i < variable.length; i++)",

};

var question4 = {
    question: 'Am I too lazy to write more questions?',
    answers: ["Yes", "No", "Maybe", "The answer is Yes, I'm tired :("],
    correctA: "Yes",

};

// array of above questions
var questionList = [
    question1,
    question2,
    question3,
    question4,
];

init();


// gets high scores from local storage and runs on initialisation
function init() {
    var storedScoreList = JSON.parse(localStorage.getItem("highscores"));
    if (storedScoreList !== null) {
        highscoreList = storedScoreList;
    }
    displayHS();
}


// clears high scores from display and local storage
function clearScores(event){
    event.preventDefault();
    highscoreEl.textContent = "";
    localStorage.clear();
    highscoreList = [];
    
}

// displays highscores onto screen
// resets highscoreEl each time so for loop doesnt repeat loop for previous scores
function displayHS() {
    highscoreEl.textContent = "";
    for (var i = 0; i < highscoreList.length; i++) {
        var div = document.createElement("div");
        div.classList.add("choice");
        div.textContent = highscoreList[i].name + " got a score of " + highscoreList[i].hScore;
        highscoreEl.appendChild(div);
    }
    
}

// saves score to local storage, hides submit button so user cant press twice and then runs displayHS() function
function submitScore(event) {
    event.preventDefault();
    var initials = userID.value;
    var userHS = {
        name: initials,
        hScore: score,
    };
    highscoreList.push(userHS);
    buttonSubmit.style.visibility ="hidden";
    localStorage.setItem("highscores", JSON.stringify(highscoreList));
    displayHS();
}

// game over hides questions/answers and displays highscore board and stops timer
function gameOver() {
    qaContainer.hidden = true;
    gameOverDisplay.hidden = false;
    message1.textContent = "GAME OVER!";
    scoreEl.textContent = "You got a score of: " + score;
    clearInterval(timerInterval);

}

// activates timer, if time runs out, gameover(), if time less than 10sec, red text.
function setTime() {
    timeLeft = 20;
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

// displays current score
function scoreDisplay() {
    currentScore.textContent = "Current Score: " + score;
}

// hides message2 which is correct/wrong
function hideMessage() {
    message2.textContent = " ";
    
}

// hides start button after clicking
function hideButton() {
    buttonStart.style.display = "none";
}

// if current question# matches number of questions available, gameover.
function displayQuestion() {
    if (questionNumber === questionList.length) {
        gameOver();
        return;
    }
    // runs a loop to display current question/answers and displays the score
    questionsEl.textContent = questionList[questionNumber].question;
    for (var i = 0; i < questionList[questionNumber].answers.length; i++) {
        choiceEl[i].textContent = questionList[questionNumber].answers[i];
    }
    scoreDisplay();
}

// checks if answer selected is correct and changes text color to red/green and reverts back to default colour after 350ms
function correctAnswer(event) {
    event.preventDefault();
    
    var selected = event.target;
    if (selected.textContent === questionList[questionNumber].correctA) {
        selected.style.color = "green";
        message2.textContent = "CORRECT";
        message2.style.color = "green";
        questionNumber++;
        setTimeout(hideMessage, 350);
        setTimeout(function(){selected.style.color = "orange"}, 350);
        setTimeout(displayQuestion, 350);
        score++;

    } else {
        selected.style.color = "red";
        message2.textContent = "WRONG";
        message2.style.color = "red";
        questionNumber++;
        setTimeout(hideMessage, 350);
        setTimeout(function(){selected.style.color = "orange"}, 350);
        setTimeout(displayQuestion, 350);
    }
}

// resets values to default so user can repeat quiz
function resetValues() {
    questionNumber = 0;
    score = 0;
    answersContainer.style.visibility = "hidden";
    gameOverDisplay.hidden = true;
    qaContainer.hidden = false;
    answersContainer.style.visibility = "visible";
    buttonSubmit.style.visibility = "visible"; 
}

// runs the functions
function startQuestions() {
    resetValues();
    setTime();
    hideButton();
    displayQuestion();
}

// hides answers and gameover display until start is pressed
answersContainer.style.visibility = "hidden";
gameOverDisplay.hidden = true;

// event listeners for the buttons
buttonStart.addEventListener("click", startQuestions);
buttonRedo.addEventListener("click", startQuestions);
buttonSubmit.addEventListener("click", submitScore);
buttonClear.addEventListener("click", clearScores);
viewScore.addEventListener("click", gameOver);

// event listeners for the answers clicked
choiceA.addEventListener("click", correctAnswer);
choiceB.addEventListener("click", correctAnswer);
choiceC.addEventListener("click", correctAnswer);
choiceD.addEventListener("click", correctAnswer);