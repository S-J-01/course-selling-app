import { Box } from "@mui/material"
import {Card} from "@mui/material"
import {TextField} from "@mui/material"

function Login(){

    return(
        <Box
        sx={{
            height:'100%',
            width:'100%'
        }}
        >
            <Card
            sx={{
                width:'25%',
                height:'25%'
            }}
            >
               

            <TextField
                id="filled-helperText"
                label="Username"
                variant="filled"
                sx={{
                    width:'100%'
                  
                }}
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
            />    
            </Card>    
            
        </Box>
    )
}

export default Login