let timerEl=document.getElementById("timer");
let inputEl=document.getElementById("inputType");
let imageEl=document.getElementById("image");
let counter=10;
let interval=setInterval(function(){
    counter=counter-1;
    timerEl.textContent=counter;
    if(counter ===0){
        timerEl.textContent="Blast";
        timerEl.style.color="Red";
        imageEl.style.display="none"
        timerEl.style.fontSize="50px";
        clearInterval(interval)
    }
},1000);
inputEl.addEventListener("keydown",function(event){
  let inputValue=inputEl.value.trim();
  if (event.key === "Enter" && inputValue==="defuse"&& counter !==0){
    timerEl.textContent="Good job.. The bomb has been defused";
    timerEl.style.color="green";
    timerEl.style.fontSize="40px";
    clearInterval(interval)
}
});
