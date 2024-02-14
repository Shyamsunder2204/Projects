import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UpdateEmployee({show,handleClose,employee}) {
  const {id}=useParams();
    const[updateEmployee,setUpdateEmployee]=useState(employee);

    useEffect(() => {
      const fetchEmployeeDetails = async () => {
        try {
          if (employee) {
            const response = await fetch(`http://localhost:3000/updateEmployee/${employee.id}`);
            const data = await response.json();
            setUpdateEmployee(data);
          }
        } catch (error) {
          console.error('Error fetching employee details:', error);
        }
      };
      fetchEmployeeDetails();
    }, [employee]);
    
    const handleUpdateSubmit=async event=>{
      event.preventDefault();
      try{
        const response= await fetch(`http://localhost:3000/updateEmployee/${updateEmployee.id}`,{
          method:"PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateEmployee),
        });
        if (response.ok){
          handleClose();
         
          
        }else{
          console.error('Update failed:', response.statusText);
        }
      }catch(error){
        console.error('Update failed:', error.message);
      }
    }
  return (
    <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
    <div className="modal-dialog" role="document">
      <div className="modal-content">
      <div className="modal-header">
            <h5 className="modal-title">Add Employeehere</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button> 
          </div>
          <div className="modal-body">
          <form onSubmit={handleUpdateSubmit}>
            <div className="mb-3" >
                <label htmlFor="name" className="form-label">Add Employee Name</label>
                <input type="text" className="form-control" id="name" name="name" value={updateEmployee.employeename} onChange={(e)=>setUpdateEmployee({...updateEmployee,employeename:e.target.value})} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={updateEmployee.email} onChange={(e)=>setUpdateEmployee({...updateEmployee,email:e.target.value})} />
              </div>
              <div className="mb-3">
                <label htmlFor="EmpId" className="form-label">EmployeeID</label>
                <input type="text" className="form-control" id="EmpId" name="EmpId" value={updateEmployee.employeeid} onChange={(e)=>setUpdateEmployee({...updateEmployee,employeeid:e.target.value})} />
              </div>
              <button type="submit" className="btn btn-primary">update</button>
            </form>
      </div>
    </div> 
    </div>
    </div>
  )
}
