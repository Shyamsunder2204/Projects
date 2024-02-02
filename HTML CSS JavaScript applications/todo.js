let todoItemsContainerEl=document.getElementById("todoItemsContainer");
let saveButtonEl=document.getElementById("saveButton");

 let todoItems=[
     {
         text:"learn Html",
         uniqueId:1

     },
     {
         text:"learn javascript",
         uniqueId:2
     },
     {
         text:"learn java",
         uniqueId:3
     }

];

function createTodoItem(todo){
 let listItem=document.createElement("li");
 listItem.classList.add("todo-item-container", "d-flex", "flex-row");
 todoItemsContainerEl.appendChild(listItem);

 let inputElement=document.createElement("input");
 inputElement.type="checkbox";
 inputElement.id="checkbox"+ todo.uniqueId;
 listItem.appendChild(inputElement);


let labelContainer=document.createElement("div");
labelContainer.classList.add("label-container", "d-flex", "flex-row");
listItem.appendChild(labelContainer);

 let labelElement=document.createElement("label");
labelElement.setAttribute("for", inputElement.id);
 labelElement.textContent=todo.text;
 labelContainer.appendChild(labelElement);

 let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIconContainer.appendChild(deleteIcon);

inputElement.addEventListener("change", function(){
if (inputElement.checked){
    labelElement.style.textDecoration="line-through";
}
else{
    labelElement.style.textDecoration="none"; 
}
});

deleteIcon.addEventListener("click", function(){
    listItem.remove()
});
}
for (i=0; i<todoItems.length;i++){
    createTodoItem(todoItems[i]);
}
 let userInputElement=document.getElementById("userInput");
 let todoButton=document.getElementById("addTodoButton");
 todoButton.addEventListener("click",function(){
 let userInputValue=userInput.value;
 if (userInputValue===""){
    alert("enter valid text");
    return;
 }
 else{
    let newTodo={
            text:userInputValue,
            uniqueId:todoItems.length+1
    }
    todoItems.push(newTodo);
    createTodoItem(newTodo);
    userInput.value=""; 
 };
 
 });

 saveButtonEl.addEventListener("click", function(){
    localStorage.setItem("todoItemslist",todoItems);
});
