var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=1;
function nextSequence()
{
  userClickedPattern=[];
  var randomNumber=Math.random();
  randomNumber=Math.floor(randomNumber*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor)
  $("#level-title").text("level "+level);
  level=level+1
}



$('.btn').click(function()
{
var userChosenColour=$(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour)
checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor)
{
  $("."+currentColor).addClass("pressed");

  setTimeout(function(){
$("."+currentColor).removeClass("pressed");
  },100);
}
//initialize the game by keypress
var started=false;
$(document).keypress(function(){
  if(!started){
     nextSequence()
     started=true;
}
})

function checkAnswer(currentlevel)
{
  if(gamePattern[currentlevel]===userClickedPattern[currentlevel])
  {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){// "===" means the lenght as well as values have to same

    // Call nextSequence() after a 1000 millisecond delay.

     setTimeout(function (){
       nextSequence();
     }, 1000);
  }

  }

 else {

 console.log("wrong");
 $("#level-title").html("Game over,press any key to restart")
 var wrong=new Audio("sounds/wrong.mp3")
 wrong.play()

 $('body').addClass("game-over");
 setTimeout(function(){
   $("body").removeClass("game-over")
 },200)
 startOver()//if wrong then call the startOver function to restart tha game
}
}

function startOver(){
  //set all the variable to initial values
  level=1;
  gamePattern=[];
  started=false;
}
