import React from "react"
import {Link} from "react-router-dom"
import { useState,} from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const changeEmail = (event) => {
        setEmail(event.target.value);
    }
    
    const changePassword = (event) => {
        setPassword(event.target.value);
    }
    

   const submitForm=async event=>{
        event.preventDefault();
        const userDetails = {Email, password}
         const url = 'http://localhost:3000/login';
         const options = {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(userDetails)
         }
         try{
            const response = await fetch(url, options)
            const data = await response.json(); 
            if (response.ok) {
                if (data === 'Login successful') {
                    navigate('/hrms');
               }else if(data==="Invalid password") {
                setErrorMsg("Invalid credentials. Please try again.");
            }
            else{
                setErrorMsg("user not found")
            }
        }
        }catch(error){
            console.error('There was an error with the request:', error);
        }
}
        return(
            <div className="container">
                <h1 className="mb-3">Login</h1>
                <form onSubmit={submitForm}>
                    <div>
                    <input type="email"  className="form-control" style={{ width: '30%',marginBottom:"10px" }} placeholder="Enter your email" value={Email} onChange={changeEmail} />
                    </div>
                    <input type="password"  className="form-control" style={{ width: '30%',marginBottom:"10px" }} placeholder="enter password" value={password} onChange={changePassword}/>
                    <button type="submit">Login</button>
                </form>
                <p>If your a new user?  <span><Link to="/signup">signup</Link></span></p>
                {errorMsg && <p>{errorMsg}</p>}
            </div>
        )
    }

export default Login;