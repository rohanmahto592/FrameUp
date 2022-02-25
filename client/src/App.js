import './App.css';
import React from 'react'
import Navbar from './components/navbar/Navbar';
import Home from './components/pages/home/Home';
import Login from './components/pages/login/Login';
import Upload from './components/pages/uploads/Upload'
import Register from './components/pages/register/Register';
import Profile from './components/pages/profile/Profile';
import Footer from './components/footer/Footer';
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
function App() {
  return (
    <div className="App">
     
     <Router>
       <Navbar/>
       <Switch>
       <Route exact path="/" component ={Home}/>
       <Route exact path="/login" component ={Login}/>
       <Route exact path="/upload" component ={Upload}/>
       <Route exact path="/register" component ={Register}/>
       <Route exact path="/profile" component ={Profile}/>

       </Switch>
       <Footer/>
     </Router>
    </div>
  );
}

export default App;
