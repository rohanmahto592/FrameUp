import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {Image} from 'cloudinary-react'
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField  from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import {useState} from 'react';


import { useHistory } from 'react-router-dom';

const pages = [{home:'Home',key:'/'},{home:'Register',key:'/register'},{home: 'Login',key:'/login'},{home:'Upload',key:'/upload'},{home:'Profile',key:'/profile'}];

console.log(pages);
const Navbar = ({prof}) => {
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [checkpas,setcheckpas] = useState("");
  const history = useHistory();
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
       setOpen(true);
    };
  
  const handleClose = () => {
      setOpen(false);
   };
  
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const passwordkeeper=(event)=>{
    setcheckpas(event.target.value);
  }
  const aggree=(pas)=>{
    const name = localStorage.getItem("name");

    Axios.get(`/user/password/${name}`).then((response)=>{
      console.log(response);
      if(response.data[0].password === pas){
      
        
        localStorage.removeItem("loggedin");
        setOpen(false);
        history.push('/');
      }
      else{
        alert("Incorrect Password!!");
        setOpen(false);
      }
      
    })
  }

 
  
  return (
    <AppBar position="static" style={{backgroundColor:"#212024"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            style={{color:"whitesmoke",textShadow:"1px 2px 2px white",fontWeight:"bolder",fontSize:"30px",fontFamily:"comic sans "}}
          >
            Frame<span style={{color:"#9D27B0"}}>Up</span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                display: { xs: 'block', md: 'none' },
              }}
            >
                
              {pages.map((page,index) => (
                  
                  
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                <Link to={page.key} style={{textDecoration:"none"}}>
                  
                  <Typography textAlign="center" style={{color:"#9D27B0"}}>{page.home}</Typography>
                  <Divider />
                  </Link>
                  
                </MenuItem>
                
              ))}
              {localStorage.getItem("loggedin")==='true'?<>
     <Button variant="text" size='small' onClick={handleClickOpen} style={{color:"teal",fontWeight:"bold",textTransform:"capitalize",marginLeft:"5px"}}>
         LogOut
      </Button> <Divider/> </> :null}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            style={{color:"whitesmoke",textShadow:"1px 2px 2px white",fontWeight:"bolder",fontSize:"30px",fontFamily:"comic sans ms"}}
          >
             Frame<span style={{color:"teal"}}>Up</span>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' ,marginLeft:"15vw"} }}>
            {pages.map((page) => (
                <Link to={page.key} style={{textDecoration:'none'}}>
              <Button 
                key={page.home}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#9D27B0', display: 'block',fontWeight:"bold"}}
              >
                {page.home}
              </Button>
              </Link>

            )
            )}
    {localStorage.getItem("loggedin")==='true'?
     <Button variant="text" onClick={handleClickOpen} style={{color:"#9D27B0",fontWeight:"bold"}}>
         LogOut
      </Button> :null}
      
               
      <div>
      <Dialog
        open={open}
        
        
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        
      >
        <DialogTitle>{"CONFIRMATION!!"}</DialogTitle>
        <DialogContent>
        <TextField
          label = "enter your password"
          type="password"
          variant= "outlined"
          autoFocus
          style={{width:"350px",margin:"10px"}}
          onChange={passwordkeeper}/>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Disaggree</Button>
          <Button onClick={()=>aggree(checkpas)}>Aggree</Button>
        </DialogActions>
      </Dialog>
      </div> 
          </Box>
          {/* <Search> */}
          
            {/* <StyledInputBase
              placeholder="Search by title..."
              onChange={searching}
              
            /> */}
            
           {/* </Search> */}
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;