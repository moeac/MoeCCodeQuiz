var questions = document.querySelector("#question");
var answers = document.querySelector("#answers");
var startButton = document.querySelector("#start-button");


var options = [" "]

var options1 = [
    "answer1A",
    "answer1B",
    "answer1C",
    "answer1D"
];

var options2 = [
    "answer2A",
    "answer2B",
    "answer2C",
    "answer2D"
];

var options3 = [
    "answer3A",
    "answer3B",
    "answer3C",
    "answer3D"
];


function loopAnswers() {
    for (var i = 0; i < options.length; i++) {
        var choice = document.createElement('button');
        choice.appendChild(document.createTextNode(options[i]));
        var select = answers.appendChild(choice);
        select = document.createAttribute("yoo");
    }

}



function startQuestions() {
    hideButton();
    questions.textContent = ("This is question#1");
    options = options1;
    loopAnswers();
    // secondQuestions();
}

function secondQuestions() {
    answers.textContent = "";
    questions.textContent = ("This is Question#2");
    options = options2;
    loopAnswers();
    thirdQuestions();
}

function thirdQuestions() {
    answers.textContent = "";
    questions.textContent = ("This is Question#3");
    options = options3;
    loopAnswers();
}

function hideButton() {
    document.getElementById('start-button').style.display = "none";
}

startButton.addEventListener("click", startQuestions);


