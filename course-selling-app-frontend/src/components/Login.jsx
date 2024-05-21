import { TextField } from "@mui/material"
import {Button} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
function Login(){

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
        method :'post',
        url: 'http://localhost:3000/admin/login',
        headers:{
            'Content-Type':'application/json',
            'username': username,
            'password' : password

        }
    }

    const onLogin = ()=>{
        axios(config)
         .then(response=>{
            console.log(response.data)
            localStorage.setItem('token',response.data.token)
            setUsername('')
            setPassword('')
            navigate('/all-courses')
         })
         .catch(err=>{
            console.log(err)
         })
    }
    return(
        <>
        <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={handleUsernameChange}/>
        <TextField id="outlined-password-input" label="Password" type="password" value={password} onChange={handlePasswordChange}/>
        <Button variant="contained" onClick={onLogin}>Login</Button>
        <span>Don't have an account yet?</span>
        <Button variant="contained" onClick={()=>navigate('/')}>Register</Button>
        </>
    )
}

export default Login