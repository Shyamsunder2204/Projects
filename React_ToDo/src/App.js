import React from 'react'
import Todo from './Todo'
import Registration from './Registration'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Registration/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/todo" element={<Todo/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

