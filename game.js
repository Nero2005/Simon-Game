let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeOut(100);
  playSound(`sounds/${randomChosenColor}.mp3`);
  $(`#${randomChosenColor}`).fadeIn(100);
  level++;
  console.log(level);
  $("#level-title").text(`Level ${level}`);
}

$(document).keydown(function (event) {
  if (!started) {
    $("#level-title").text(`Level 0`);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  console.log(userClickedPattern);
  console.log(gamePattern);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (currentLevel == gamePattern.length - 1) {
      console.log("finished");
      setTimeout(() => {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound(`sounds/wrong.mp3`);
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    // $(document).keydown(function (event) {
    //   startOver();
    // });
  }
}

function playSound(name) {
  let audio = new Audio(name);
  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

for (let button of document.querySelectorAll(".btn")) {
  button.addEventListener("click", function () {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(`sounds/${userChosenColor}.mp3`);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
}
