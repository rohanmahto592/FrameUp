import React,{useState,useEffect} from 'react'
import './uploadstyle.css'
import Axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useHistory} from 'react-router-dom'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Home2 from '../home/Home2';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Upload = () => {
    const history = useHistory();
    const [genre, setgenre] = useState('');
    const [title,settitle] = useState("");
    const [desc,setdesc] = useState("");
    const [video,setvideo] = useState([]);
    const handleChange = (event) => {
        setgenre(event.target.value);
    };
    const [open, setOpen] = React.useState(false);
    const check = localStorage.getItem("loggedin");
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    const upload=()=>{
        const formdata = new FormData()
        
        formdata.append("file",video)
        formdata.append("upload_preset","wqxj4uji")
        Axios.post("https://api.cloudinary.com/v1_1/didiqujli/upload",formdata).then((response)=>{
            console.log(response.data);
            const filename = response.data.public_id;
            const date = response.data.created_at;
            const duration = response.data.duration;
            const link = response.data.url;
            Axios.post("/upload/uploadvideo",{
                title:title,
                description: desc,
                video:filename,
                date:date,
                genre:genre,
                duration: duration,
                author: localStorage.getItem("name"),
                link: link,
            }).then((response)=>{
                console.log(response);
                setOpen(true);
              
            })
        })
    }
  return (
    check === 'true'?
      <div className='body'>
    
    <div className="container">
    <div className="title">Upload Your Video</div>
    <div className="content">
      
        <div className="user-details">
        <input  type="file" onChange={(event)=>{setvideo(event.target.files[0])}} />
          <div className="input-box">
              
            <span className="details">Title</span>
            <input type="text" placeholder="Title..." onChange={(event)=>{settitle(event.target.value)}}  required/>
          </div>
          <div className="input-box">
            <span className="details">Description</span>
            <input type="textarea" placeholder="Desciption..." onChange={(event)=>{setdesc(event.target.value)}} required/>
          </div>
          <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" required>Genre</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={genre}
          label="Genre"
          onChange={handleChange}
        >
          <MenuItem value={"Comedies"}>Comedies</MenuItem>
          <MenuItem value={"WebSeries"}>WebSeries</MenuItem>
          <MenuItem value={"Trailers"}>Trailers</MenuItem>
          <MenuItem value={"Music"}>Music</MenuItem>
          <MenuItem value={"Courses"}>Courses</MenuItem>
          <MenuItem value={"Gaming"}>Gaming</MenuItem>
          <MenuItem value={"Gadgets"}>Gadgets</MenuItem>
          <MenuItem value={"Filmi"}>Filmi</MenuItem>
          <MenuItem value={"News"}>News</MenuItem>
        </Select>
      </FormControl>
    </Box>
          
        </div>
        
        </div>
         <Button variant="outlined" onClick={upload}>
        Upload
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Uploaded successfully
        </Alert>
      </Snackbar>
      
    </div>

  </div>:<Home2/>

  )
}

export default Upload