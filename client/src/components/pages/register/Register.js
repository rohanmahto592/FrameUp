import React,{useState,useEffect} from 'react'
import './registerstyle.css'
import Axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [email,setemail] = useState("");
    const [open, setOpen] = useState(false);
    const [image,setimage] = useState([])
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    const register=()=>{
      const formdata = new FormData()
        
        formdata.append("file",image)
        formdata.append("upload_preset","wqxj4uji")
        Axios.post("https://api.cloudinary.com/v1_1/didiqujli/image/upload",formdata).then((response)=>{
            console.log(response.data);
            const filename = response.data.public_id;
        Axios.post('/user/register',{
            name: username,
            password : password,
            email: email,
            image: filename,
        }).then((response)=>{
            setOpen(true);
        })
      })
    }
  return (
      <div className='body'>
    
    <div className="container">
    <div className="title">Registration</div>
    <div className="content">
      
        <div className="user-details">
          
            <span className="details">Profile Photo</span>
            <input type="file"  onChange={(event)=>{setimage(event.target.files[0])}} required/>
          

          <div className="input-box">
            <span className="details">Full Name</span>
            <input type="text" placeholder="Enter your name" onChange={(event)=>{setusername(event.target.value)}}  required/>
          </div>
          <div className="input-box">
            <span className="details">Email</span>
            <input type="email" placeholder="Enter your email" onChange={(event)=>{setemail(event.target.value)}} required/>
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input type="password" placeholder="Enter your password" onChange={(event)=>{setpassword(event.target.value)}} required/>
          </div>
          
          
        </div>
        
        </div>
        <Button variant="outlined" onClick={register}>
        Register
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Registered successfully
        </Alert>
      </Snackbar>
    </div>

  </div>

  )
}

export default Register