import { Box, IconButton, Typography } from "@mui/material"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Button from '@mui/material/Button';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { userIsLoading } from "../store/selectors/userIsLoading";
import { userStateUsername } from "../store/selectors/userStateUsername";
import { useNavigate } from "react-router-dom";

interface AppbarProps{
  isDarkMode: boolean;
  setDarkMode: (value: boolean)=>void;
}

function Appbar({isDarkMode,setDarkMode}: AppbarProps){

    const toggleDarkMode=()=>{
        setDarkMode(!isDarkMode)
      }

      const userLoading = useRecoilValue(userIsLoading)
      const userUsername = useRecoilValue(userStateUsername)
      const setUser = useSetRecoilState(userState)
      const navigate = useNavigate()
      console.log(userLoading)
      console.log(userUsername)
      const onLogin = ()=>{
        navigate('/login')
      }

      const onSignup = ()=>{
        navigate('/signup')
      }

      const onLogout = ()=>{
        localStorage.removeItem('userAccessToken')
        setUser({
            isLoading:false,
            username:null
        })
        navigate('/')
      }

      if(userLoading){
        return(
            <></>
        )
      }
      if(userUsername){
        return(
            <>
            <Box
           sx={{
            width:'100%',
            height:'5%',
            display:'flex',
            justifyContent:'space-between',
            border:'1px solid red',
            paddingLeft:'10px',
            paddingRight:'10px'
           }}
           >
            <Box>
                <Typography variant="h4">
                Course Selling Application
                </Typography>
            </Box>

            <Box>
            <Button variant="text" sx={{margin:'4px'}} onClick={()=>{navigate('/courses')}}>Courses</Button>   
            <Button variant="text" sx={{margin:'4px'}} onClick={()=>{navigate('/purchasedCourses')}}>Purchased Courses</Button>
            <Button variant="text" sx={{margin:'4px'}} >{userUsername}</Button>
            <Button variant="contained" sx={{margin:'4px'}} onClick={onLogout}>Logout</Button>
            <IconButton onClick={toggleDarkMode}>
                {isDarkMode?<DarkModeIcon/>:<LightModeIcon/>}
            </IconButton>
            </Box>
            


           </Box>
            </>
        )
      }
      else{
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
            <Button variant="contained" sx={{margin:'4px'}} onClick={onLogin}>Login</Button>
            <Button variant="text" sx={{margin:'4px'}} onClick={onSignup}>Sign Up</Button>
            <IconButton onClick={toggleDarkMode}>
                {isDarkMode?<DarkModeIcon/>:<LightModeIcon/>}
            </IconButton>
            </Box>
            


           </Box>
        </>
    )}
}

export default Appbar