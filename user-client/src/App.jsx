import {Routes,Route} from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BASE_URL } from './config'
import { ThemeProvider,CssBaseline } from '@mui/material'
import Landing from './components/Landing'
import Login from './components/Login'
import Signup from './components/Signup'
import Appbar from './components/Appbar'
import Box from '@mui/material/Box'
import { lightTheme,darkTheme } from './themes'
function App() {
  
  const[isDarkMode,setDarkMode] = useState(false)

  const toggleDarkMode=()=>{
    setDarkMode(!isDarkMode)
  }

  return (
    <>
    <ThemeProvider theme={isDarkMode?darkTheme:lightTheme}>
    <CssBaseline/>
    <Appbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}/>
     <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
     </Routes>
     </ThemeProvider>
    </>
  )
}

export default App
