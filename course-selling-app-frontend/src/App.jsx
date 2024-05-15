import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Register/>}></Route>
        <Route path = '/login' element={<Login/>}></Route>
      </Routes>
    </>
  )
}

export default App
