import { Box, Typography } from "@mui/material"
import {Paper} from "@mui/material"


function Landing(){
    return(
        <Box
        sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            width:'100%',
            height:'95%'
        }}
        >

            <Paper>
                
                <Typography variant="h1">
                Upgrade your skills today!
                </Typography>
                
            </Paper>
            
       
        </Box>
    )
}

export default Landing