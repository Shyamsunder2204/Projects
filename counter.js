let counterElement=document.getElementById("counterValue");
function onIncrement(){
let oldvalue=counterElement.textContent;
let newValue=parseInt(oldvalue)+1;
if (newValue>0){
    counterElement.style.color="green";
}
counterElement.textContent=newValue;
}
function onDecrement(){
let oldvalue=counterElement.textContent;
let newValue=parseInt(oldvalue)-1;
if (newValue<0){
    counterElement.style.color="red";
}
counterElement.textContent=newValue;
}
function onReset(){
    counterElement.style.color="black";
    counterElement.textContent=0;
}
