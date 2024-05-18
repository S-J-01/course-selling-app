import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import AllCourses from './components/AllCourses'
import Navbar from './components/Navbar'
import CreateCourse from './components/CreateCourse'

function App() {
 

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Register/>}></Route>
        <Route path = '/login' element={<Login/>}></Route>
        {/* The routes below will show the Navbar */}
        <Route element={<Navbar/>}>
        <Route path = '/all-courses' element={<AllCourses/>}></Route>
        <Route path = '/create-course' element={<CreateCourse/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
