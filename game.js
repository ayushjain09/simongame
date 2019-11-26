var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern=[];
var level=0;
var started=false;

$("body").on("keypress",function(){
  if(!started)
  setTimeout(nextSequence,300);

  started=true;
});

function nextSequence() {

  level++;
  userClickedPattern=[];

  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function playSound(color) {

      var audio = new Audio("sounds/"+color+".mp3");
      audio.play();
  }


$(".btn").on("click",function(event){

  var userChosenId = event.target.id;
  // var userChosenId = $(this).attr("id");
  userClickedPattern.push(userChosenId);

  playSound(userChosenId);
  animatePress(userChosenId);
  checkAnswer(userClickedPattern.length);
});

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },50);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel-1]!==gamePattern[currentLevel-1])
  {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

   if(currentLevel===gamePattern.length)
    {
      setTimeout(nextSequence,500);
    }
}

function startOver(){


  started=false;
  gamePattern=[];
  level=0;
}
