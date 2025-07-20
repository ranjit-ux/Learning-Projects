var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level" + level);
        nextSequence();
        started=true;
    }
})

function nextSequence(){
    userClickedPattern=[];

    level++;

    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);
    animatePress(randomChosenColor);
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playsound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(()=>{
        $("#"+currentColor).removeClass("pressed");
    },100);
}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playsound("wrong")
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        startOver();
    }

    console.log("userClickedPattern",userClickedPattern);
    console.log("gamePattern",gamePattern);
}

function startOver(){
    level = 0;
    gamePattern=[];
    started = false;
}