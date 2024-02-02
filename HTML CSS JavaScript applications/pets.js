let formEl=document.getElementById("myform");
let selectEl=document.getElementById("selectId");
let petEl=document.getElementById("pet");

let petImages={
    dog: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/select-your-pet-dog-img.png",
    cat: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/select-your-pet-cat-img.png",
    parrot: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/select-your-pet-parrot-img.png"
};
selectEl.addEventListener("change",function(event){
    let selectedPet=event.target.value;
    let petImageEl=petImages[selectedPet];
    petEl.src=petImageEl;
})