import { Button } from '@mui/material';
import React from 'react'
import {Link} from 'react-router-dom'
import './homestyle2.css';
const Home2 = () => {
  return (
    <div>
        <div class="img">
    </div>
  <div className="center">
    <div className="title">Frame Up</div>
    <div className="sub_title">Login to our site to post good stuffs!!</div>
    <Link to="/login" style={{textDecoration:"none"}}>
    <Button variant='contained' color="primary" style={{marginTop:"15px"}} >Login</Button>
    </Link>
  </div>

    </div>
  )
}

export default Home2