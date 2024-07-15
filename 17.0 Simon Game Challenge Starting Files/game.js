var gamePattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var level = 0;
var gameStarted = false; 

// $("#start-btn").click(function() {
//     $("#start-btn").hide();

//     var startAudio = new Audio("sounds/start.mp3");
//     startAudio.play()
//     setTimeout(nextSequence, 1000)
// });

$(".btn").click(function() {

    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function() {
    if (!gameStarted) { 
        $("#level-title").text("Level " + level);
        gameStarted = true;
        nextSequence();
    }
});

function nextSequence() {
    userClickedPattern = [];

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(50).fadeOut(50).fadeIn(50);

    playSound(randomChosenColour);
    
    level++;
    $("#level-title").text("Level " + level);
}

function playSound(name) {
    var audioPath = "sounds/" + name + ".mp3";
    
    var a = new Audio(audioPath);
    a.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        let wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(startOver(), 5000);
    }
}

function startOver() {
    level = 0;
    gameStarted = false;
    gamePattern = [];
}
