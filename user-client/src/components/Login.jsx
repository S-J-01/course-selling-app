import { Box, Button } from "@mui/material"
import {Card} from "@mui/material"
import {TextField} from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../config"
function Login(){

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const navigate =useNavigate()

    const handleUsernameChange = (event)=>{
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event)=>{
        setPassword(event.target.value)
    }

    const config = {
        method:'post',
        url:`${BASE_URL}/users/login`,
        headers:{
            'Content-Type':'application/json',
            'username': username,
            'password' : password
        }
    }

    const onLogin = async()=>{
       try{
        const response = await axios(config)
        localStorage.setItem('userAccessToken',response.data.token)
        setUsername('')
        setPassword('')
        navigate('/courses')
       }
        catch (err){
            console.log(err)
        }
        
    }

    return(
        <Box
        sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'95%',
            width:'100%',
            border:'1px solid blue'
        }}
        >
            <Card
            sx={{
                display:'flex',
                flexDirection:'column',
                width:'25%',
                
                
            }}
            >
               

            <TextField
                id="filled-helperText"
                label="Username"
                variant="filled"
                sx={{
                    width:'100%'
                  
                }}

                value={username}
                onChange={handleUsernameChange}
            />   
            
            <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="filled"

                sx={{
                    width:'100%'
                   
                }}

                value={password}
                onChange={handlePasswordChange}
            />    
            <Button variant="contained" onClick={onLogin} >Login</Button>
            </Card>    
            
        </Box>
    )
}

export default Login