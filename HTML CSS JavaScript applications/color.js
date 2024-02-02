let colorEl=document.getElementById("colors");
let selectEl=document.getElementById("select");


let defaultColor=colorEl.value;
selectEl.style.backgroundColor=defaultColor;
colorEl.addEventListener("change",function(){
   let selectedColor=colorEl.value;
   console.log(selectedColor);
    selectEl.style.backgroundColor=selectedColor;

});

let blueEl=document.getElementById("blueColor");
let redEl=document.getElementById("red");
let greenEl=document.getElementById("green");

blueEl.addEventListener("click", function(){
    selectEl.style.backgroundColor="blue";
});

