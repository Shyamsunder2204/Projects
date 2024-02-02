// let containerElement=document.getElementById("mycontainer");
// let h1Element=document.createElement("h1");
// h1Element.textContent="this is shyam";
// containerElement.appendChild(h1Element);
// console.log(containerElement);
// let btnElement=document.createElement("button");
// btnElement.textContent="change text";
// containerElement.appendChild(btnElement);
// btnElement.onclick=function(){
//     h1Element.textContent="hii how can I help you";
//     h1Element.style.color="blue";
// }
document.getElementById("button");
function button() {
    var colors = ["green", "blue", "yellow", "#brown", "orange"];
    var randomIndex = Math.ceil(Math.random() * colors.length);
    var randomColor = colors[randomIndex];
    console.log(randomIndex);
    document.getElementById('container').style.backgroundColor = randomColor;
}





