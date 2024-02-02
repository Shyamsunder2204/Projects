let buttonEl=document.getElementById(".twentyseconds");
let thirtyButton=document.getElementById("thirtyseconds");
let tenbutton=document.getElementById("tenseconds");
let timerText=document.getElementById("timertext");


function starttimer(duration){
    let timer=duration;
    let interval=setInterval(function(){
        timer=timer-1;
        timerText.textContent=timer;
        if (timer===0){
            timerText.textContent="time is completed...";
            clearInterval(interval)
        }
},1000)
}
buttonEl.addEventListener("click",function(){
    starttimer(20);
});
