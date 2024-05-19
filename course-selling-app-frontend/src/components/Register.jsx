import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from "react";
import axios from 'axios'

function Register(){
    const navigate = useNavigate();
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const handleUsernameChange = (event)=>{
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event)=>{
        setPassword(event.target.value)
    }

    const config = {
        method:'post',
        url:'http://localhost:3000/admin/signup',
        data:{
            username:username,
            password:password
        }
    }
    const onRegister = ()=>{
        axios(config)
         .then((response)=>{
            console.log(response.data.message)
            console.log(response.data.token)
            localStorage.setItem('token' , response.data.token)
            setUsername('')
            setPassword('')
            navigate('all-courses')
         }).catch(err=>{
            console.log(err)
         })
    }
    
    return(
        <>
         
        <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={handleUsernameChange}  />
        <TextField id="outlined-password-input" label="Password" type="password" value={password} onChange={handlePasswordChange}/>
        <Button variant="contained" onClick={onRegister}>Register</Button>
        <span>Already have an account?</span>
        <Button variant="contained" onClick={()=>navigate('login')}>Login</Button>
        </>
    )


}

export default Register