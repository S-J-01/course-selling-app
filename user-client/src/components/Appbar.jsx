import { Box, IconButton } from "@mui/material"
import Brightness3Icon from '@mui/icons-material/Brightness3';
import LightModeIcon from '@mui/icons-material/LightMode';

function Appbar({isDarkMode,toggleDarkMode}){
    return(
        <>
           <Box
           sx={{
            width:{xs:'100%'},
            height:'10%'
           }}
           >
            <IconButton onClick={toggleDarkMode}>
                {isDarkMode?<Brightness3Icon/>:<LightModeIcon/>}
            </IconButton>
           </Box>
        </>
    )
}

export default Appbar