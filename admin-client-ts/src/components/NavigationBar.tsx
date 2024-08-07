import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
//import Avatar from '@mui/material/Avatar';
//import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
//import AdbIcon from '@mui/icons-material/Adb'
import Person2Icon from '@mui/icons-material/Person2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const pages = ['All Courses', 'Create Course'];
const settings = ['Logout'];

function NavigationBar() {
  //const [anchorElNav, setAnchorElNav] = React.useState(null);
  //const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [username,setUsername] = React.useState(null)
  const authorizationToken = localStorage.getItem('token')


  
  const navigate = useNavigate();
 
  
  const handleOpenNavMenu = (event : React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event:React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemNavigate=(page: string)=>{
    const destinationRoute = `/${page.toLowerCase().replace(' ','-')}`
    navigate(destinationRoute) 
  }

  const onLogout = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }

  const config = {
    method:'GET',
    url:'http://localhost:3000/admin/me',
    headers:{
      'Content-Type':'application/json',
      'Authorization': `Bearer ${authorizationToken}`
    }
  }
  React.useEffect(()=>{
    
    axios(config)
      .then(response=>{
        console.log('control in axios request')
        console.log(response.data)
        console.log(response.data.username)
        console.log('control after axios')
        if(response.data.username){
          setUsername(response.data.username)
        }
      })
      .catch(err=>{
        console.log(err)
      })

  },[])
  
  return (
    <AppBar position="static">
      <Container maxWidth="100vw">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex'},border:'1px solid white' }}>
            <Tooltip title='Menu'>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            </Tooltip>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={()=>handleMenuItemNavigate(page)}>
                  
                  
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              textAlign: 'center'
            }}
          >
            CSA
          </Typography>

          <Typography
            variant="h3"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            
            sx={{
              border:'1px solid white',
              textAlign:'center',
              mr: 2,
              display: { xs:'none',md: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
              
            }}
          >
            Course Selling Application
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 ,size:'large',color:'inherit',border:'1px solid white'}}>
              <Person2Icon/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Typography textAlign="center">{username}</Typography>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={onLogout}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              
                  
                
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}


export default NavigationBar;
