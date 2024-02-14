 import React from 'react';
 import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./components/Home"
import Registration from "./components/Registration"
import Login from "./components/Login"
import Hrms from './components/Hrms'
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="login" element={<Login />} />
         <Route path="/hrms" element={<Hrms />} />
         <Route path="/addEmployee" element={<AddEmployee />} />
         <Route path="/addEmployeeList" element={<EmployeeList/>}/>
         

      </Routes>
    </BrowserRouter>
  );
}
export default App;
