import { Box, Button } from "@mui/material"
import {Card} from "@mui/material"
import {TextField} from "@mui/material"

function Signup(){
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
            <Button variant="contained" >Sign Up</Button>
            </Card>    
            
        </Box>
    )
}

export default Signup