import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import AllCourses from './components/AllCourses'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Register/>}></Route>
        <Route path = '/login' element={<Login/>}></Route>
        <Route path = '/all-courses' element={<AllCourses/>}></Route>
      </Routes>
    </>
  )
}

export default App
