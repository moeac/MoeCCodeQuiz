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

var optionsArray = [
    options1,
    options2,
    options3,
];

function questionDisplay() {
    questions.textContent = optionsArray[optionNumber].question;
}

function loopAnswers() {
    questionDisplay();
    
    for (var v = 0; v < optionsArray[optionNumber].answers.length; v++) {
        choice[v].textContent = optionsArray[optionNumber].answers[v];
    }
    
}

function correctAnswer(event) {
    event.preventDefault();
    var selected = event.target;
    if (selected.textContent === optionsArray[optionNumber].correctA) {
        message.textContent = "CORRECT";
        optionNumber++;
        loopAnswers();
    } else {
        message.textContent = "WRONG";
        optionNumber++;
        loopAnswers();
    }
}

function startQuestions() {
    hideButton();
    loopAnswers();
      
}


function hideButton() {
    document.getElementById('start-button').style.display = "none";
}

startButton.addEventListener("click", startQuestions);

choiceA.addEventListener("click", correctAnswer);
choiceB.addEventListener("click", correctAnswer);
choiceC.addEventListener("click", correctAnswer);
choiceD.addEventListener("click", correctAnswer);