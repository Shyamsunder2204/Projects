import React, { useEffect, useState } from 'react'
import "../App.css"
import UpdateEmployee from './UpdateEmployee';
import Swal from 'sweetalert2'; 


export default function EmployeeList() {
    const[employeeList,setEmployeelist]=useState([]);
    const[searchInput,setSearchInput]=useState("");
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const[showModal,setShowModal]=useState(false);
    const[updateEmployee,setUpdateEmployee]=useState({employeename: "",
    email: "",
    employeeid: "",});
    
    
    useEffect(() => {
        fetchEmployeeList();
      }, []);
    
      useEffect(()=>{
        const result=employeeList.filter(employee=>
             employee.employeename.includes(searchInput)
        )
        setFilteredEmployees(result);
    }, [searchInput, employeeList]);
   
    const fetchEmployeeList=async()=>{
     try{
         const response=await fetch("http://localhost:3000/employeelist");
         const data= await response.json()
         setEmployeelist(data)
    }
    catch(error){
        console.error('Error fetching employee list:', error);
    }
    }
    const changeState=(event)=>{
        setSearchInput(event.target.value)
    }
      
      
    const handleDelete= async (id) => {
    try {
      const shouldDelete = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this employee!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });
      if (shouldDelete.isConfirmed) {
      await fetch(`http://localhost:3000/deleteEmployee/${id}`, {
        method: 'DELETE',
      }); 
      setEmployeelist(employeeList.filter((employee) => employee.id !== id));
      Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      
    }
  };

  const handleUpdate=(employee)=>{  
  setShowModal(true);
  console.log(employee.id);
  setUpdateEmployee({id:employee.id,employeename:employee.employeename,email:employee.email,employeeid:employee.employeeid});
  };
  const handleClose = () => {
    setShowModal(false);
  }
  
    
    const displayEmployees = searchInput ? filteredEmployees : employeeList;

    
  return (
    <div>
        <h1>Employee List</h1>
        <div className="input-field">
        <input type="text" placeholder='search name' value={searchInput} onChange={changeState} ></input>
        </div>
        <table className="employee-table">
            <thead>
                <tr>
                    <th>EmployeeName</th>
                    <th>Email</th>
                    <th>EmployeeId</th>
                </tr>
            </thead>
                 <tbody>
                    {displayEmployees.length > 0 ? (
                        displayEmployees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.employeename}</td>
                                <td>{employee.email}</td>
                                <td>{employee.employeeid}</td>
                                <td><button className="btn btn-primary" onClick={()=>handleUpdate(employee)}>Edit</button>
                                <button className="btn btn-danger ms-2" onClick={()=>handleDelete(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No employees found</td>
                        </tr>
                    )}
                </tbody>
        </table>
        {showModal && <UpdateEmployee show={showModal} handleClose={handleClose} employee={updateEmployee} />}
                
    </div>
  )
        }
