let firstNumber=document.getElementById("firstNumber");
let secondNumber=document.getElementById("secondNumber");
let userInput=document.getElementById("userInput");
let gameResult=document.getElementById("gameResult");
function reset(){
    let firstNumberGenerator=Math.ceil(Math.random()*100);
    let secondNumberGenerator=Math.ceil(Math.random()*100);
    firstNumber.value=firstNumberGenerator;
    secondNumber.value=secondNumberGenerator;
     userInput.value="";
}
function check(){
    let firstRandom=parseInt(firstNumber.value);
    let secondRandom=parseInt(secondNumber.value);
    let sumTotal=parseInt(userInput.value);
    if ( firstRandom + secondRandom === sumTotal){
        gameResult.textContent="congrats... your right";
        gameResult.style.color="green";
    }
    else{
        gameResult.textContent="wrong answer ...try again";
        gameResult.style.color="Red";
    }

}

