import { TextField } from "@mui/material"
import {Button} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
function Login(){

    const navigate = useNavigate();
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement> )=>{
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
        <Box
        sx={{
            display:'flex',
            width:'100vw',
            height:'100vh',
            margin:0,
            padding:0,
            boxSizing:'border-box',
            justifyContent:'center',
            alignItems:'center',
            border:'1px solid black',
            flexDirection:'column',
            gap:6
            
         }}
        >

            <Box
            sx={{
                border:'1px solid black',
                width:'80vw',
                textAlign:'center',
                }}
            >
                
                <Typography variant="h1" gutterBottom>
                    Course Selling Application
                </Typography>
            </Box>
            
            
            <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    border:'1px solid black',
                    gap:4,
                    width:'50vw',
                    boxShadow:15
                 }}
            >   
                <TextField id="outlined-basic" label="Admin Username" variant="outlined" value={username} onChange={handleUsernameChange}/>
                <TextField id="outlined-password-input" label="Admin Password" type="password" value={password} onChange={handlePasswordChange}/>
                <Button variant="contained" onClick={onLogin}>Login</Button>
                <span>Don't have an account yet? <Button onClick={()=>navigate('/')}>Register</Button></span>
                
                

            </Box>
        
        </Box>
    )
}

export default Login