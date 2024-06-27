import { Box, Button } from "@mui/material"
import {Card} from "@mui/material"
import {TextField} from "@mui/material"
import { useState } from "react"
import { BASE_URL } from "../config"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

function Signup(){
    const navigate = useNavigate()
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
        url:`${BASE_URL}/users/signup`,
        data:{
            username:username,
            password:password
        }
    }
    const onSignup = async ()=>{
     const response =await axios(config)
     try{
        localStorage.setItem('userAccessToken',response.data.token)
        setUsername('')
        setPassword('')
        navigate('/courses')
     }
     catch(err){
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
            <Button variant="contained" onClick={onSignup} >Sign Up</Button>
            </Card>    
            
        </Box>
    )
}

export default Signup