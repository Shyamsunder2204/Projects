import React, { useState } from 'react';
import "../App.css"

export default function AddEmployee({ show, handleClose,fetchEmployeeCount }) {
  const [EmployeeName,setEmployeeName]=useState("");
  const [Email,setEmail]=useState("");
  const [EmployeeID,setEmployeeID]=useState("");
  const[errorMsg,setErrorMsg]=useState("")
  const [successMsg, setSuccessMsg] = useState("");

  const clearMessages = () => {
    setErrorMsg("");
    setSuccessMsg("");
  }
  const NameInputChange=(event)=>{
         setEmployeeName(event.target.value);
         clearMessages();
  }
  const EmailInputChange=(event)=>{
        setEmail(event.target.value);
  }
  const IdInputChange=(event)=>{
        setEmployeeID(event.target.value);
  }
  const handleSubmit=async event=>{
    event.preventDefault();
    const employeeDetails={EmployeeName,Email,EmployeeID}
    const url='http://localhost:3000/addEmployee';
    const options={
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(employeeDetails)
   }
   try{
    const response = await fetch(url, options)
    const data= await response.json()
    if(response.status==409){
      setErrorMsg(data.message)
      setEmployeeName("")
      setEmail("")
      setEmployeeID("")

    }
   else if(response.status==201){
    fetchEmployeeCount();
    setSuccessMsg(data.message)
    setEmployeeName("")
    setEmail("") 
    setEmployeeID("")
    // handleClose();
  }
  else{
    setErrorMsg("something went wrong")
  }
   }
   catch(error){

    console.error('There was an error with the request:', error);

   }
  }
  
  return (
    <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title">Add Employeehere</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button> 
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
            <div className="mb-3" >
                <label htmlFor="name" className="form-label">Add Employee Name</label>
                <input type="text" className="form-control" id="name" name="name" value={EmployeeName} onChange={NameInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={Email} onChange={EmailInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="EmpId" className="form-label">EmployeeID</label>
                <input type="text" className="form-control" id="EmpId" name="EmpId" value={EmployeeID} onChange={IdInputChange} />
              </div>
              <button type="submit" className="btn btn-primary">Add Employee</button>
            </form>
            {errorMsg && <p className="error">{errorMsg}</p>}
            {successMsg && <p className="success">{successMsg}</p>} 
          </div>
        </div>
      </div>
      
    </div>
  );
}
