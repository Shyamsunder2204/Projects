let userInput=document.getElementById("userInput");
let gameResult=document.getElementById("gameResult");
let randomNumber=Math.ceil(Math.random()*100);
console.log(randomNumber);
function check(){
   let userGuess=parseInt(userInput.value);
      if (userGuess > randomNumber){
        gameResult.textContent="too high...try again";
        gameResult.style.color="red";
      }
    else if (userGuess < randomNumber){
        gameResult.textContent="too low.. try again"
        gameResult.style.color="yellow";
     }
     else if (userGuess === randomNumber){
        gameResult.textContent="successfully number matched..."
       gameResult.style.color="white";
     }
     else{
       gameResult.textContent="invalid input...try again"
        gameResult.style.color="red";
    }
    }