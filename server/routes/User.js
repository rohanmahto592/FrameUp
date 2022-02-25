const express = require("express");
const router = express.Router();
const db = require("../configdb/Db")

router.post('/register',(req,res)=>{
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const image = req.body.image;
    console.log(name);
    
    db.query("INSERT INTO registration (username,password,email,profile) values(?,?,?,?)",[name,password,email,image],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})
router.get('/login/:name/:pass',(req,res)=>{
    const name = req.params.name;
    const password = req.params.pass;
    console.log(name);
    db.query("select * from registration where username=?",name,(err,result)=>{
        console.log(result)
        if(err){
            console.log(err);
        }

        else{
            if(result.length>0){
                if(password === result[0].password){
                    res.json({
                        loggedin:true,
                        name: name,
                        image : result[0].profile,
                        message: "logged in successfully"
                    })
                }
                else{
                    res.json({
                        loggedin: false,
                        message: "incorrect password"
                     } )
                }
            }
            else{
                res.json({
                    message: "user doesn't exist"
                })
            }
        }
    })
})
router.get('/validate/:name',(req,res)=>{
    const name = req.params.name;

    db.query("select profile from registration where username=? ",name,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})
router.get('/password/:name',(req,res)=>{
    const name = req.params.name;

    db.query("select password from registration where username=?",name,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})
router.get('/getprofile/:name',(req,res)=>{
    const name = req.params.name;

    db.query("select profile from registration where username =?",name,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{  
            res.send(result);
        }
         
    
})})
module.exports = router