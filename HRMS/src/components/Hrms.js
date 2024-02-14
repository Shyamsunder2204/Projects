import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AddEmployee from './AddEmployee';
import "../App.css"

export default function Hrms() {
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const[employeeCount,setEmployeeCount]=useState(0);
  const navigate = useNavigate();


  const handleAddEmployeeClick = () => {
    setShowAddEmployeeModal(true);
  };
  const handleClose = () => {
    setShowAddEmployeeModal(false);
  }
  
  const fetchEmployeeCount = async () => {
    try {
      const response = await fetch('http://localhost:3000/employeeCount');
      const data = await response.json();
      setEmployeeCount(data.count);
    } catch (error) {
      console.error('Error fetching employee count:', error);
    }
  };
  useEffect(() => {
    fetchEmployeeCount();
  }, []); 
  const clickLogout=()=>{
    navigate("/");
  }
  return (
    <div>
      <nav className="navbar navbar-light  fixed-top">
  <div className="container-fluid">
  <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-start"  id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">HRMS</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
          <li className="nav-item">
            <Link to=""className="nav-link active" aria-current="page" >Home</Link>
          </li>
          <li className="nav-item">
            <Link to="" className="nav-link" >Link</Link>
          </li>
          <li className="nav-item dropdown">
            <Link to="" className="nav-link dropdown-toggle"  id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Employees
            </Link>
            <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
              <li><button className="dropdown-item " onClick={handleAddEmployeeClick}>Add Employee</button></li> 
             </ul>
             <AddEmployee show={showAddEmployeeModal} handleClose={handleClose} fetchEmployeeCount={fetchEmployeeCount} />
             </li>
             <li className="nav-item dropdown">
            <Link to="" className="nav-link dropdown-toggle"  id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Department
            </Link>
            <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
              <li><Link to="" className="dropdown-item">Add Department</Link></li>
              <li><Link to="" className="dropdown-item" >Remove Department</Link></li> 
             </ul>
           </li>
         </ul> 
      </div>
    </div>
    <button type="button" className="btn btn-primary" onClick={clickLogout}>
  Logout
</button>
  </div>
</nav>

<h1 className='bg-primary hrms-heading'>Welcome to HRMS</h1>
<div className="row">
  <div className="col-4 details box ">
     <Link to="/addEmployeeList" className="text-decoration-none text-dark employee"> <h5 >Employees</h5>
      <p className="count fw-bold fs-3  " >{employeeCount}</p></Link>
  </div>
  <div className="col-3 details box ">
    <h5>Projects</h5>
    <p className="count fw-bold fs-3">0</p>
  </div>
  <div className="col-3 details box">
    <h5 >Leave requests</h5>
    <p className="count fw-bold fs-3">0</p>
  </div>
</div>
</div>
  )
}
