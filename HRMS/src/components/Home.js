import React from 'react'
import Header from "./Header"
import "../App.css"
import {Link} from "react-router-dom"



export default function Home() {
    return (
    
    <div>
    <Header/>
    <h1 className="heading">welcome to Human resource managment system</h1>
    <div className="row">
        <div className="col-6 flex-column d-flex justify-content-center align-items-center">
          <h1 className="hrms">HRMS Software</h1>
          <p>Get opearation HR out of the way make time for high value work</p>
          <div className="mt-4 me-0">
          <Link to="/login"><button className="btn btn-danger" type="button">Start your free trail</button></Link>
          </div>
        </div>
        <div className="col-6">
          <img src="https://intellipayroll.com/images/hrms.png" width="90%"  alt="not found"/>
        </div>
    </div>
    
    </div>
  )
};
