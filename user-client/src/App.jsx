import {Routes,Route} from 'react-router-dom'
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import { BASE_URL } from './config'
import { ThemeProvider,CssBaseline } from '@mui/material'
import Landing from './components/Landing'
import Login from './components/Login'
import Signup from './components/Signup'
import Appbar from './components/Appbar'
import Courses from './components/Courses'
import Box from '@mui/material/Box'
import { lightTheme,darkTheme } from './themes'
import axios from 'axios'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import { userState } from './store/atoms/user'
function App() {
  
  const[isDarkMode,setDarkMode] = useState(false)

 

  return (
   
    <div
    style={{
      height:'100vh',
      width:'100vw',
      
      border:'1px solid green'
    }}>
    <ThemeProvider theme={isDarkMode?darkTheme:lightTheme}>
    <CssBaseline/>
    <InitUser/>
    <Appbar setDarkMode={setDarkMode} isDarkMode={isDarkMode}/>
    
     <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/courses' element={<Courses/>}/>
     </Routes>
     </ThemeProvider>
    </div>
    
  )
}

function InitUser (){
const setUser = useSetRecoilState(userState)

const init = async ()=>{
  try{
  const response= await axios({
    method:'get',
    url:`${BASE_URL}/users/me`,
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Bearer '+localStorage.getItem('userAccessToken')
    }
  })

  if(response.data.username){
    setUser({
      isLoading:false,
      username:response.data.username
    })
  }
  else{
    setUser({
      isLoading:false,
      username:null
    })
  }
}
 catch(err){
  setUser({
    isLoading:false,
    username:null
  })
 }
}
useEffect(()=>{
init()
},[])
  return(
    <></>
  )
}

export default App
