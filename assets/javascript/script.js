var main = document.querySelector("#main");
var startButton = document.querySelector("#start");
var questions = ["Commonly used data types DO NOT include ____.", "The condition in an if / else statement is enclosed within ____.", "Arrays in JavaScript can be used to store ____.", "String values must be enclosed within ____ when being assigned to variables", "A very useful tool used during development and debugging for pringing content to the debugger is ____"];
var answers = [["strings", "booleans", "alerts", "numbers"], ["quotes", "curly brackets", "parenthesis", "square brackets"], ["numbers and strings", "other arrays", "booleans", "all of the above"], ["commas", "curly brackets", "quotes", "parenthesis"], ["JavaScript", "terminal / bash", "for loops", "console.log"]];
var correct = [[false, false, true, false], [false, true, false, false], [false, false, false, true], [false, false, true, false], [false, false, false, true]];
var choices = [document.createElement("BUTTON"), document.createElement("BUTTON"), document.createElement("BUTTON"), document.createElement("BUTTON")];
var timeEl = document.querySelector("#time");
var viewHS = document.querySelector("#viewhs");
var time = 75;
var questionNumber = 1;
var randVar;
var twoSecs = 75;
var viewingHighScore = false;
var pEl = document.createElement("p");
var inputEl = document.createElement("input");
var articleEl = document.createElement("article")
var submitButton = document.createElement("BUTTON");
var ulEl = document.createElement("ul");
var clearHS = document.createElement("button")
var resetButton = document.createElement("button")
var response = document.createElement("p")
if (JSON.parse(localStorage.getItem("highScores")) === null) {
    localStorage.setItem("highScores", JSON.stringify([]));
}
var highScores = JSON.parse(localStorage.getItem("highScores"))
pEl.textContent = "Enter initials: ";
submitButton.textContent = "Submit";
pEl.setAttribute("style", "margin-right: 10px; width: fit-content;")
inputEl.setAttribute("style", "position: relative; left: 125px; top: -19px; height: 20px");
submitButton.setAttribute("style", "position: relative; left: 125px; top: -19px; margin-top: 0px;");
articleEl.setAttribute("style", "display: none; margin: 10px; margin-left: 20%; height: 15px;");
clearHS.setAttribute("style", "display: none;");
resetButton.setAttribute("style", "display: none;");
response.setAttribute("style", "display: block; color: gray;")
main.appendChild(ulEl);
main.appendChild(clearHS);
main.appendChild(resetButton);
main.appendChild(articleEl);
articleEl.appendChild(pEl);
articleEl.appendChild(inputEl);
articleEl.appendChild(submitButton);
clearHS.textContent = "Clear Highscores"
resetButton.textContent = "Go back"
for (i in choices) {
    main.appendChild(choices[i]);
    choices[i].setAttribute("style", "display: none;");
    choices[i].setAttribute("id", (parseInt(i) + 1).toString());
    choices[i].setAttribute("class", "answers")
}
main.appendChild(response);

function reset() {
    time = 75;
    timeEl.textContent = time;
    questionNumber = 1;
    main.setAttribute("style", "display: flex;")
    main.children[0].setAttribute("style", "align-self: center; margin-left: 0px;");
    main.children[0].textContent = "Coding Quiz Challenge";
    let stringVar = "Try to answer the following code-related questions within the time <br>limit. Keep in mind that incorrect answers will penalize your score/time <br>by ten seconds"
    main.children[1].innerHTML = stringVar
    main.children[1].setAttribute("style", "display: block;")
    main.children[2].setAttribute("style", "display: block;")   
    resetButton.setAttribute("style", "display: none;") 
    clearHS.setAttribute("style", "display: none;") 
    ulEl.setAttribute("style", "display: none")
    highScores = JSON.parse(localStorage.getItem("highScores"));
    viewingHighScore = false;
    inputEl.value = "";
    twoSecs = 2;
}

function intervals() {
    var interval = setInterval(function() {
        if (!((questionNumber - 1) < questions.length) || viewingHighScore) { 
            timeEl.textContent = time;
            response.setAttribute("style", "display: none");
            clearInterval(interval);
            return;
        }
        if ((twoSecs - time) === 2 ) {
            response.setAttribute("style", "display: none");
        }

        if (time <= 0) {
            time = 0
            timeEl.textContent = time;
            response.setAttribute("style", "display: none");
            zero();
            clearInterval(interval);
            return;
        } else {
            time--;
            timeEl.textContent = time;
        }
        
    }, 1000);
}

function viewHighScores() {
    main.setAttribute("style", "display: block;")
    main.children[0].textContent = "Highscores";
    main.children[0].setAttribute("style", "text-align: left; margin-left: 20%;");
    main.children[1].setAttribute("style", "display: none");
    response.setAttribute("style", "display: none");
    articleEl.setAttribute("style", "display: none");
    startButton.setAttribute("style", "display: none;");
    if (JSON.parse(localStorage.getItem("highScores")) === null) {
        localStorage.setItem("highScores", JSON.stringify([]));
        
        randVar = JSON.parse(localStorage.getItem("highScores"))
            randVar.sort(function(a, b) {
            return b.scores - a.scores
        });

        for (i in randVar) {
            ulEl.appendChild(document.createElement("li"));
            ulEl.children[i].textContent = (parseInt(i) + 1) + ". " + randVar[i]["names"] + " - " + randVar[i]["scores"];
            ulEl.setAttribute("style", "background: #ff8cff; width: 50%; margin-left: 20%; margin-top: 15px;");
        }
        clearHS.setAttribute("style", "display: block; margin-left: 20%; position: relative; top: -3px; left: 150px;")
        resetButton.setAttribute("style", "display: block; margin-left: 20%; margin-right: 20px; position: relative; top: -35px;")
}
    for (i in choices) {
        choices[i].setAttribute("style", "display: none;");
    }
    viewingHighScore = true;
}

function zero() {
    main.children[0].textContent = "Time up!";
    for (i in choices) {
        choices[i].setAttribute("style", "display: none;");
    }
    resetButton.setAttribute("style", "display: block; margin-left: 20%;")
    resetButton.textContent = "Restart"
}

function initials() {
    main.children[0].textContent = "All done!";
    main.children[1].textContent = "Your final score is " + time + "!";
    main.children[1].setAttribute("style", "display: block; text-align: left; margin-left: 20%;")
    articleEl.setAttribute("style", "margin-left: 20%; margin-top: 20px; display: inline-block;")
    for (i in choices) {
        choices[i].setAttribute("style", "display: none;");
    }
}

function nextQuestion() {
    questionNumber++;
    if (((questionNumber - 1) < questions.length) && (time != 0)) {
        askQuestion();
    } else if(time <= 0) {
        time = 0;
        zero();
    } else {
        response.setAttribute("style", "display: none")
        initials();
    }
    return;
}

function checkAnswer(element) {
    if ((questionNumber - 1) < questions.length) {
        if (correct[questionNumber - 1][parseInt(element.id) - 1]) {
            response.textContent = "Correct! "
            response.setAttribute("style", "display: block; text-align: left; margin-left: 20%; margin-top: 30px; padding-top: 8px; border-top: 2px solid gray;");
            twoSecs = time + 1;
        } else {
            time -= 10;
            timeEl.textContent = time + 1;
            twoSecs = time;
            response.textContent = "Wrong! "
            response.setAttribute("style", "display: block; text-align: left; margin-left: 20%; margin-top: 30px; padding-top: 8px; border-top: 2px solid gray;");
        }
        nextQuestion();
    }
    return;
}

function askQuestion() {
    main.children[0].textContent = questions[questionNumber - 1];
    for (i in choices) {
        choices[i].textContent = (parseInt(i) + 1) + ". " + answers[questionNumber - 1][i];
        choices[i].setAttribute("style", `position: relative; top: ${(20 + "px")}; display: block; width: fit-content;`)
    }
    return;
}


function start() {
    main.children[0].setAttribute("style", "align-self: flex-start; margin-left: 20%;");
    main.children[1].setAttribute("style", "display: none;");
    main.children[2].setAttribute("style", "display: none");
    main.setAttribute("style", "display: block;")
    askQuestion();
    intervals();
    return;
}

startButton.addEventListener("click", start);

main.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches(".answers")) {
        checkAnswer(element);
    }
})

submitButton.addEventListener("click", function() {
    let randObj = {
        names: inputEl.value,
        scores: time
    };
    highScores.push(randObj);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    viewHighScores();
})

viewHS.addEventListener("click", viewHighScores)


clearHS.addEventListener("click", function() {
    localStorage.setItem("highScores", JSON.stringify([]));
    highScores = [];
    for (i in randVar) {
        ulEl.children[i].textContent = "";
    }
    console.log(ulEl)
    ulEl.setAttribute("style", "display: none;");
})

resetButton.addEventListener("click", reset);