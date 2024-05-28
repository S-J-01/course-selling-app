import { useState } from 'react'
import { useLocation } from 'react-router-dom'
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
 
  const location = useLocation()
  const pathsWithNavigationBar = ['/all-courses', '/create-course', '/all-courses/:courseID']
  const shouldShowNavigationBar = pathsWithNavigationBar.some(path => location.pathname.startsWith(path))
  

  return (
    <Box>
      {shouldShowNavigationBar&&<NavigationBar/>}
      
      <Routes>
        <Route path='/' element={<Register/>}></Route>
        <Route path = '/login' element={<Login/>}></Route>
        <Route path = '/all-courses' element={<AllCourses/>}></Route>
        <Route path = '/create-course' element={<CreateCourse/>}></Route>
        <Route path = '/all-courses/:courseID' element={<EditCourse/>}></Route>
        
      </Routes>
      
    </Box>
  )
}

export default App
