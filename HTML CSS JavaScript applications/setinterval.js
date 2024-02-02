let interval;
let counter=0;
function display(){
    let message=document.getElementById("messageDisplay");
    console.log(counter);
    message.textContent += counter;
    counter=counter+1;
   }
let startButton=document.getElementById("button");
startButton.addEventListener("click", function(){
    interval=setInterval(display,1000);
});
let stopButton=document.getElementById("stop");
stopButton.addEventListener("click",function(){
    clearInterval(interval);
});