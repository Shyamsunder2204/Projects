import React, { useEffect } from "react"
import {Link, useNavigate} from "react-router-dom"
import { useState,} from "react";


function Login() {
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    // const [userid, setUserId] = useState(null);

    
    const changeEmail = (event) => {
        setEmail(event.target.value);
        setErrorMsg("")
    }
    
    const changePassword = (event) => {
        setPassword(event.target.value);
        setErrorMsg("")
    }  
      
    const submitForm = async (event) => {
        event.preventDefault();
        const userDetails = { Email, password };
        const url = 'http://localhost:3000/login';
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userDetails),
        };
      
        try {
          const response = await fetch(url, options);
          const data = await response.json();
      
          if (response.ok) {
            if (data.message === "Login successful") {
                const userId = data.userId; // Extract userId from the server response
                localStorage.setItem("userID", userId);
              navigate('/todo');
            } else  {
              // Incorrect password
              setErrorMsg("User not found or invalid credentials");
            }
          } 
        } catch (error) {
          console.error('There was an error with the request:', error);
        }
      };
      
        return(
            <div className="container login-container d-flex flex-column align-items-center justify-content-center mt-5 bg-light p-3 ">
                <h1 className="mb-3">Login</h1>
             <form onSubmit={submitForm}>
             <div>
              <input type="email" className="form-control" style={{ width: '130%', marginBottom: "10px" }} placeholder="Enter your email" value={Email} onChange={changeEmail} />
              </div>
             <input type="password" className="form-control" style={{ width: '130%', marginBottom: "10px" }} placeholder="enter password" value={password} onChange={changePassword} />
            <button type="submit" className="btn btn-outline-primary">Login</button>
             </form>
                <p className="mt-2">If your a new user?  <span><Link to="/">signup</Link></span></p>
                {errorMsg && <p>{errorMsg}</p>}
            </div>
        )
    }

export default Login;