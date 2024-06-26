import { Box, IconButton, Typography } from "@mui/material"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Button from '@mui/material/Button';

function Appbar({isDarkMode,setDarkMode}){

    const toggleDarkMode=()=>{
        setDarkMode(!isDarkMode)
      }
    return(
        <>
           <Box
           sx={{
            width:'100%',
            height:'5%',
            display:'flex',
            justifyContent:'space-between',
            border:'1px solid red'
           }}
           >
            <Box>
                <Typography variant="h4">
                Course Selling Application
                </Typography>
            </Box>

            <Box>
            <Button variant="contained" sx={{margin:'4px'}}>Login</Button>
            <Button variant="text" sx={{margin:'4px'}}>Sign Up</Button>
            <IconButton onClick={toggleDarkMode}>
                {isDarkMode?<DarkModeIcon/>:<LightModeIcon/>}
            </IconButton>
            </Box>
            


           </Box>
        </>
    )
}

export default Appbar