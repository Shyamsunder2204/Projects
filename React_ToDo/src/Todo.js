import React, { useEffect, useState } from 'react'
import "./App.css";
import { GoX } from "react-icons/go";
import Swal from 'sweetalert2'; 
import { useNavigate } from 'react-router-dom';



export default function Todo() {
const [name,setName]=useState("");
const [description,setDescription]=useState("");
const [userID, setUserID] = useState("");
const[todoItems,setTodoItems]=useState([]);
const navigate = useNavigate();
  

useEffect(() => {
  const storedUserID = localStorage.getItem("userID");
  if (storedUserID) {
    setUserID(storedUserID);
  }
}, []);
useEffect(()=>{
  fetchTodoItems();
},[userID])
  const taskName=(event)=>{
       setName(event.target.value)
  }
  const taskDescription=(event)=>{
    setDescription(event.target.value)
}
const fetchTodoItems = async () => {
  try {
    const response = await fetch(`http://localhost:3000/todoItems/${userID}`);
    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setTodoItems(data);
    console.log(data)
  } catch (error) {
    console.error('Error fetching details:', error);
  }
};

const handleSubmit=async (event)=>{
   event.preventDefault();
   const newTask={name,description,userID}
   const url = 'http://localhost:3000/addtodo';
         const options = {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(newTask)
         }
         try{
          const response = await fetch(url, options)
          if(response.ok){
            setTodoItems([...todoItems,newTask])
            setName("")
            setDescription("") 
            fetchTodoItems(); 
          }else{
            throw new Error('Network response was not ok.');
          }
        }catch(error){
          console.error('Error making POST request:', error);
        }
      }
      const deleteTodo = async (todoid,taskname) => {
        const isConfirmed = await Swal.fire({
          title: `Are you sure you want to delete"${taskname}"?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });
        if (isConfirmed.isConfirmed) {
          const response = await fetch(`http://localhost:3000/deleteTodo/${todoid}`, {
            method: "DELETE",
          });
          if (response.ok) {
            console.log("Deleted successfully");
            fetchTodoItems(); 
          } else {
            console.log("Error deleting");
          }
        } 
      };
      const handleLogout = () => {
        Swal.fire({
            title: 'Logout',
            text: 'Are you sure you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/login");
            }
        });
    }
    
  
  
  return (
    <div className="container">
      <div>
        <h1 className="mt-3">Add Your Tasks Here..</h1>
        <form className="d-flex flex-column mt-3 mb-3" onSubmit={handleSubmit}>
            <input type="text" className="me-2 mb-3 w-25 p-2 " placeholder='Task name' onChange={taskName} value={name}/>
            <input type="text" className="me-2 mb-3 w-25 p-2" placeholder='Task description' onChange={taskDescription} value={description}/>
            <div className="d-flex me-3">
            <button type="submit"  className="btn btn-success me-3"> Add</button>
            <button type="button"  className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
        </form>
        </div>
      <div className="mt-4 bg-light">
        <ul className="listItems">
        {todoItems.map((todo,index) => (
  <li key={index}>
    <div className="d-flex justify-content-between">
    <h5 >{todo.taskname}</h5>
    <h4 className="me-3" onClick={()=>{deleteTodo(todo.todoid,todo.taskname)}}><GoX /></h4>
    </div>
    <p className="ms-1 ">{todo.taskdescription}</p>
  </li>
))}

        </ul>
      </div>
    </div>
  )
}
