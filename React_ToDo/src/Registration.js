import React,{ useState} from "react";
import { useNavigate,Link } from "react-router-dom";
function Registration() {
    const [userName, setUserName] = useState("");
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [existingUserMsg, setExistingUserMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
  
    const changeUser = (event) => {
      setUserName(event.target.value);
    };
  
    const changeEmail = (event) => {
      setEmail(event.target.value);
    };
  
    const changePassword = (event) => {
      setPassword(event.target.value);
    };
    
     const submitForm = async event => {
        event.preventDefault()
         const userDetails = {userName,Email, password}
         const url = 'http://localhost:3000/signup';
         const options = {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(userDetails)
         }
      try{
        const response = await fetch(url, options)
        if(!response.ok){
            throw new Error('Network response was not ok.');
        } 
        else if (response.status===409){
          setExistingUserMsg("user already exists")
          setErrorMsg("");
        }
        else{
        const data = await response.json();
         setUserId(data.id); 
         console.log(data.id);
         setUserName("");
         setEmail("");
         setPassword("");
         setErrorMsg("");
        alert("sucessfully registered")
        navigate('/login');}
        }
        catch(error){
            // this.setState({ errorMsg: 'There was an error with the request.' });
            console.error('There was an error with the request:', error);
        }
    }
        return(
            <div>
                <h1>Registration form</h1>
                <form className=" container mt-3 "onSubmit={submitForm}>
                    <div>
                    <input type="text" className="form-control" style={{ width: '50%',marginBottom:"10px" }} placeholder="Enter username" value={userName} onChange={changeUser} />
                    </div>
                    <div>
                      
                    <input type="email" className="form-control" style={{ width: '50%',marginBottom:"10px"}} placeholder="Enter Email" value={Email} onChange={changeEmail} />
                    </div>
                    <input type="password" className="form-control"style={{ width: '50%',marginBottom:"8px" }} placeholder="create password" value={password} onChange={changePassword}/>
                    <button type="submit">Register</button>
                </form>
                <p className="container mt-3">Already registered <span><Link to="/login">Login</Link></span> </p>
                {existingUserMsg && <p>{existingUserMsg}</p>}
                {errorMsg && <p>{errorMsg}</p>}
            </div>
        )
}


export default Registration;