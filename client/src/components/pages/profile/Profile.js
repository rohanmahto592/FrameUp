import  Axios  from 'axios'
import React, { useEffect,useState } from 'react'
import './profilestyle.css'
import {Image} from 'cloudinary-react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';
import Home2 from '../home/Home2';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {AdvancedVideo} from '@cloudinary/react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Cloudinary } from '@cloudinary/url-gen';
import Box from '@mui/material/Box';


import {useHistory} from 'react-router-dom'
import {Card,Grid,CardContent,CardAction,CardMedia} from '@material-ui/core';
const Profile = () => {
    const [userprofile,setuserprofile] = useState([]);
    const [useruploads,setuseruploads] = useState([]);
    const[uploadss,setuploadss]=useState([])
    const check = localStorage.getItem("loggedin");
    const[likess,setlikess]=useState([])
    const history = useHistory();
   
  useEffect(()=>{
    const name = localStorage.getItem("name");
    Axios.get(`/user/getprofile/${name}`).then((response)=>{
        console.log(response);
        setuserprofile(response.data);
        console.log(userprofile)
       
    })
  },[localStorage.getItem("name")])
  useEffect(()=>{
    const name = localStorage.getItem("name");
    Axios.get(`/upload/profileuploads/${name}`).then((response)=>{
    console.log(response);
    setuseruploads(response.data);
  })
},[localStorage.getItem("name")])
useEffect(()=>{
  const name=localStorage.getItem("name");
  Axios.get(`/upload/totalcount/${name}`).then((response)=>{
    setuploadss(response.data);
  })
},[localStorage.getItem("name")])
useEffect(()=>{
  const name=localStorage.getItem("name");
  Axios.get(`/upload/totallikes/${name}`).then((response)=>{
    setlikess(response.data);
  })
},[localStorage.getItem("name")])
  // useEffect(()=>{
  //    const name = localStorage.getItem("name");
  //    Axios.get(`/uploads/profileuploads/${name}`).then((response)=>{
  //      console.log(response);
  //      setuseruploads(response.data);
  //    })
  // },[])
  const cld = new Cloudinary({
    cloud:{
      cloudName: "didiqujli"
    }
  })
  const delpost =(postid) =>{
    if(window.confirm("Do you wanna delete it?")){
      Axios.delete(`/upload/deletepost/${postid}`).then((response)=>{
        alert("Post Deleted Successfully!!")
        history.push('/');
      })
    }
    else{
      return;
    }
  }
  return (
    check==='true'? <>
    
    
    <div style={{display:"flex",justifyContent:"center"}}>
      <div className="container"  >
  <div className="row">
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="our-team">
        <div class="picture">
          {userprofile.length>0?<Image className="img-fluid" cloudName="didiqujli" publicId={userprofile[0].profile}/>:null} 
        </div>
        <div className="team-content">
          <h2 className="name" style={{textTransform:"capitalize",fontFamily:"cursive",fontWeight:"bold",fontSize:"30px"}} >{localStorage.getItem("name")}</h2>
          <div style={{display:"flex",justifyContent:"space-evenly"}} >
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <Typography variant="h5" color="primary" style={{fontFamily:"comic sans ms",fontWeight:"bold"}}>
                Total Likes
              </Typography>
          <Badge badgeContent={likess.length>0?likess[0].likes:0} style={{fontSize:'20px'}} color="secondary">
             < FavoriteIcon style={{fontSize:'30px',marginLeft:'10px'}} color="primary"/>
             </Badge>
             </div>   
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <Typography variant="h5" color="primary" style={{fontFamily:"comic sans ms",fontWeight:"bold"}}>
                Total Posts
              </Typography>
              {uploadss.length>0?<Typography variant="h6" color="secondary" style={{marginLeft:"5px",fontWeight:"bolder",fontSize:"25px",fontFamily:"comic sans ms"}}>
              {uploadss[0].total}
              </Typography>:<Typography color="secondary" style={{fontSize:'20px',marginLeft:'10px'}}>0</Typography>}
            </div>
        </div>
        </div>
        </div>
     </div>
     </div>   

    </div>
    </div>


     <Grid container alignItems='stretch'  spacing={3}>
     {   useruploads?.map((item)=>(
         <Grid item xs={12} md={4} lg={3} sm={6}>
         <Card sx={{ display: 'flex' }} style={{marginTop:'12px',height:'100%',backgroundColor:"Background",boxShadow:"3px 3px 5px #4e2bff ",margin:"13px"}}>
         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          
           <Box sx={{ display: 'flex',flexDirection:"row", pl: 1, pb: 1 }}>
          
          <AdvancedVideo cldVid={cld.video(item.video)} controls  loop playsInline muted style={{height:'100%',width:'100%'}}/> 
           </Box>
           <CardContent sx={{ flex: '1 0 auto' }} style={{color:"white",textTransform:"capitalize"}}>
             <Typography component="div" variant="h5">
               {item.title}
             </Typography>
             <Typography variant="subtitle1" color="text.secondary" component="div" style={{color:"whitesmoke"}}>
               {item.description}
             </Typography>
             <Typography component="div" variant="h5">
               {item.genre}
             </Typography>
           <Divider/>
           </CardContent>
             <div style={{display:"flex",alignItems:"center",justifyContent:"space-evenly"}} >
            
             <Badge badgeContent={item.like2} color="secondary">
             < FavoriteIcon color="primary"/>
             </Badge>   
             
             <DeleteForeverOutlinedIcon onClick={()=>delpost(item.id)}/>
            
             </div>
         </Box>
         
       </Card>
     
       </Grid>
     ))}
      </Grid>
       

  
  </> : <Home2/>
   
  )
}

export default Profile