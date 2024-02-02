let nameEl=document.getElementById("inputName");
let mailEl=document.getElementById("inputMail");
let errorEl=document.getElementById("nameErr");
let formEl=document.getElementById("myform");
let mailErrEl=document.getElementById("mailErr");
let selectEl=document.getElementById("status");
let maleGenderEl=document.getElementById("maleGender");
let femaleGenderEl=document.getElementById("femaleGender");


let formData={
    name:"",
    email:"",
    // status:"shyamsunder",
    gender:"male"
};


nameEl.addEventListener("change",function(event){
    // if(event.target.value===""){
    //     errorEl.textContent="Required*";
    //     errorEl.style.color="red";  
    // }
    // else{
    //     errorEl.textContent="";
    // }
    formData.name=event.target.value;
});

mailEl.addEventListener("change",function(event){
    if(event.target.value===""){
        mailErrEl.textContent="Required*";
        mailErrEl.style.color="red";  
    }
    else{
        mailErrEl.textContent="";
    }
    formData.email=event.target.value;
});

// selectEl.addEventListener("change",function(){
//     formData.status=selectEl.value;
// });
maleGenderEl.addEventListener("change",function(event){
    formData.gender=event.target.value;
});
femaleGenderEl.addEventListener("change",function(event){
    formData.gender=event.target.value;
});

function validateForm(formData){
    let {name,email}=formData;
    if(name===""){
        errorEl.textContent="Required*";
        errorEl.style.color="red";  
    }else{
        errorEl.textContent="";
    }
    if(email===""){
        mailErrEl.textContent="Required*";
        mailErrEl.style.color="red";  
    }else{
        mailErrEl.textContent="";
    }
}
function submitForm(formData){
    let options={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            accept:"application/json",
            Authorization:
            "Bearer 00f3f8fde06120db02b587cc372c3d85510896e899b45774068bb750462acd9f",
        },
        body:JSON.stringify(formData)
    };
    let url="https://gorest.co.in/public-api/users";
    fetch(url,options)
     .then(function(response){
        return response.json();
     })
     .then(function(jsonData){
        console.log(jsonData);
        // if(jsonData.code===422){
        //     if(jsonData.data[0].message==="has already taken"){
        //         mailErrEl.textContent="mail already exists*";
        //         mailErrEl.style.color="red"; 
        //     }
        // }
     });
    }

formEl.addEventListener("submit",function(event){
    event.preventDefault();
    validateForm(formData);
    submitForm(formData);
});





