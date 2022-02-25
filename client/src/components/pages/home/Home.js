import React,{useEffect,useState} from 'react'
import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';
import Navbar from '../../navbar/Navbar';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Axios from 'axios';
import {AdvancedVideo} from '@cloudinary/react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Cloudinary } from '@cloudinary/url-gen';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import ShareIcon from '@mui/icons-material/Share';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import {useHistory} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { Image } from 'cloudinary-react';
import Profile from '../profile/Profile'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {Card,Grid,CardContent,CardAction,Typography,CardMedia} from '@material-ui/core';
const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
const Home = () => {
    const [data,setdata] = useState([]);
    const [search,setsearch] = useState("");
    const history = useHistory();
    const[checker,setchecker]=useState(false);
  const [chipData, setChipData] = React.useState([
    
    { key: 1, label: 'Comedies' },
    { key: 2, label: 'WebSeries' },
    { key: 3, label: 'Trailers' },
    
    { key: 4, label: 'Courses' },
    { key: 5, label: 'Music'},
    { key: 6, label: 'Gaming'},
    { key: 7, label: 'Gadgets'},
    { key: 8, label: 'Filmi'},
    { key: 9, label: 'News'}
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [prof,setprof] = useState([]);
  const [opens, setOpen] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  useEffect(()=>{
      Axios.get('/upload/getdata').then((response)=>{
            console.log(response.data);
            setdata(response.data);

      })
  },[])
  useEffect(()=>{
    const name = localStorage.getItem("name");
    if(localStorage.getItem("loggedin")==='true'){
        Axios.get(`/user/validate/${name}`).then((response)=>{
          if(response.data.length > 0 ){
              console.log(response.data);
              const arr = [];
              arr.push(response.data);
              setprof(response.data);
              <Navbar prof={arr}/>
          }
        })
    }
    
  },[])
  const cld = new Cloudinary({
    cloud:{
      cloudName: "didiqujli"
    }
  })
  const likepost =(id)=>{
      const name = localStorage.getItem("name");
      Axios.post('/upload/getlike',{
        name: name,
        id: id,
      }).then((response)=>{
          console.log(response);
          setdata(response.data);
          // console.log(response.data[0].author);
          Axios.get(`/upload/getuser/${id}`).then((response)=>{
            alert(`you liked ${response.data[0].author} post`);
          })
         
      })
  }
  const redirect=(genre)=>{
  
    Axios.get(`/upload/genres/${genre}`).then((response)=>{
      setdata(response.data);
      console.log(response.data);
    })
  }
  const redirectall=(all)=>{
    Axios.get('/upload/getdata').then((response)=>{
      setdata(response.data);
      console.log(response.data);
    })
  }
  const searching=(event)=>{
    setsearch(event.target.value);
    console.log(event.target.value);
  }
  const searchtitle=(searcht)=>{
    const title = searcht;
    Axios.get(`/upload/search/${title}`).then((response)=>{
      console.log(response);
      setdata(response.data);
      history.push('/');
    })
  } 
  const profileupdate=()=>{
    
      history.push('/profile')
      
  
  }
  const check = localStorage.getItem("loggedin");

  return (
    <div>
        <Paper
       
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      <div style={{display:"flex",justifyContent:"center",marginTop:"4px"}}>
      <Chip
            
            label={'All'}
            onClick={()=>redirectall('All')}
            style={{color:"white",backgroundColor:"#9D27B0"}}
          />
          </div>
      {chipData.map((data) => {
    

   
        return (
          
          <ListItem key={data.key}>
            <Chip
            
              label={data.label}
              onClick={()=>redirect(data.label)}
               style={{color:"white",backgroundColor:"#9D27B0"}}
              
            />
          </ListItem>
        );
      })}
    </Paper>
    <div style={{display:"flex",justifyContent:"space-between",marginTop:"15px"}}>
            <TextField label="Search by title..." style={{width:"100%",boxShadow:'1px 1px 2px black'}} onChange={searching}/>
           
              <SearchIcon onClick={()=>searchtitle(search)} style={{fontSize:"40px"}}/>
           
           
            </div>
    <Grid style={{backgroundColor:'white',marginTop:'10px',height:'100%'}} container alignItems='stretch'  spacing={3}>
    {   data?.map((item)=>(
        <Grid item xs={12} md={4} lg={3} sm={6}>
        <Card sx={{ display: 'flex' }} style={{marginTop:'12px',height:'100%',boxShadow:"1px 1px 2px whitesmoke"}}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
         
          <Box sx={{ display: 'flex',flexDirection:"row", pl: 0, pb: 0 }}>
         
         <AdvancedVideo cldVid={cld.video(item.video)} controls  loop playsInline muted style={{height:'100%',width:'100%'}}/> 
          </Box>
          <CardContent style={{backgroundColor:'#191918'}} sx={{ flex: '1 0 auto' }}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <Typography component="div" variant="h5" style={{textTransform:"capitalize",color:"teal"}}>
              {item.title}
            </Typography>
            <Image style={{width:'20%',height:"20%",borderRadius:'50%'}} cloudName="didiqujli" publicId={item.profile} onClick={profileupdate} />
          
            </div>
            <Typography style={{color:'white',textTransform:'capitalize'}} variant="subtitle1"  component="div">
              {item.description}
            </Typography>
            <Typography component="div" variant="h5" style={{textTransform:"capitalize",color:"teal"}} >
              {item.genre}
            </Typography>
          <Divider/>
          </CardContent>
            <div style={{display:"flex",alignItems:"center",backgroundColor:"#191918",justifyContent:"space-evenly"}} >
              {check==='true'?<ThumbUpIcon style={{fontSize:30,color:"#9D27B0"}} onClick={()=>likepost(item.id)} />  
        : <ThumbUpIcon style={{fontSize:30,color:"#9D27B0"}}  />}
             
            
            <Badge badgeContent={item.like2} color="secondary">
            < FavoriteIcon color="primary"/>
            </Badge>   
            
            <ShareIcon aria-describedby={id} type="button" onClick={handleClick} color="secondary"/>
  
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 0, p: 0, bgcolor: 'background.paper' }}>
          {item.videolink}
        </Box>
      </Popper>
           
            </div>
            <div style={{display:'flex',justifyContent:'space-between'}} >
              <Typography color="primary">Posted At</Typography>
              <Typography color="secondary">{item.date}</Typography>
            </div>
        </Box>
        
      </Card>
      </Grid>
    ))
    
}
    </Grid>

    </div>
  )
}

export default Home