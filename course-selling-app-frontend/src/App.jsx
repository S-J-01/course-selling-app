import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import AllCourses from './components/AllCourses'
import NavigationBar from './components/NavigationBar'
import CreateCourse from './components/CreateCourse'
import EditCourse from './components/EditCourse'
import { Box } from '@mui/material'

function App() {
 

  return (
    <>
      
      
      <Routes>
        <Route path='/' element={<Register/>}></Route>
        <Route path = '/login' element={<Login/>}></Route>
       
        <Route path='/navigationBar' element={<NavigationBar/>}></Route>
        <Route path = '/all-courses' element={<AllCourses/>}></Route>
        <Route path = '/create-course' element={<CreateCourse/>}></Route>
        <Route path = '/all-courses/:courseID' element={<EditCourse/>}></Route>
        
      </Routes>
      
    </>
  )
}

export default App
