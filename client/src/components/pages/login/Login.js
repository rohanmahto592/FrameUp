import Axios  from 'axios';
import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import './loginstyle.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [error,seterror] = useState("");
    const history = useHistory()
    const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
    const login = ()=>{
        const name = username;
        const pass = password;
        Axios.get(`/user/login/${name}/${pass}`).then((response)=>{
            console.log(response);
            if(response.data.loggedin === true){
                localStorage.setItem("loggedin",true);
                localStorage.setItem("name",name);
                alert(response.data.message);
                history.push('/');
            }
            else{
                seterror(response.data.message);
                setOpen(true);
                
            }
            
        })
    }
  return (
    <div className='body'>
    
    <div className="container">
    <div className="title">Login</div>
    <div className="content">
      
        <div className="user-details">
          <div className="input-box">
            <span className="details">Full Name</span>
            <input type="text" placeholder="Enter your name" onChange={(event)=>{setusername(event.target.value)}}  required/>
          </div>
         
          <div className="input-box">
            <span className="details">Password</span>
            <input type="password" placeholder="Enter your password" onChange={(event)=>{setpassword(event.target.value)}} required/>
          </div>
          
        </div>
        
        </div>
              <Button variant="outlined" onClick={login}>
        Login
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      
    </div>

  </div>


  )
}

export default Login