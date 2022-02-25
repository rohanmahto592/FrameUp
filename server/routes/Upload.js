const express = require("express");
const router = express.Router();
const db = require("../configdb/Db")

router.post('/uploadvideo',(req,res)=>{
    const title = req.body.title.toLowerCase();
    const desc = req.body.description;
    const author = req.body.author;
    const date = req.body.date;
    const video = req.body.video;
    const genre = req.body.genre;
    const duration = req.body.duration;
    const link = req.body.link;
    db.query("select profile from registration where username=?",author,(err,results)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            // console.log(results[0].profile)
        
            const profile=results[0].profile;
            console.log(profile)
            db.query("INSERT INTO  uploads (title,description,genre,video,author,date,duration,videolink,profile) values(?,?,?,?,?,?,?,?,?)",[title,desc,genre,video,author,date,duration,link,profile],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("data uploaded successfully");
        }
    })
        }
    // console.log(genre,video,duration);
    
})
})
    router.get('/getdata',(req,res)=>{
        db.query("select id,title,description,genre,video,author,DATE(date) as date,duration,videolink,profile from uploads ",(err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        })
    })
router.post('/getlike',(req,res)=>{
    const name = req.body.name;
    const id = req.body.id;
    db.query("select * from likes where username=? and postid=?",[name,id],(err,result)=>{
        if(result.length>0)
        {
            db.query("select * from uploads ",
                    (err3,result3)=>{
                        if(err3){
                            console.log(err3);
                        }
                        else{
                            res.send(result3);
                        }
                    })
        }
        else
        {
            db.query("INSERT INTO likes (username,postid) values(?,?)",[name,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            db.query("Update uploads SET like2=like2+1 where id=?",id,
            (err2,result2)=>{
                if(err2){
                    console.log(err2);
                }
                else{
                    db.query("select * from uploads ",
                    (err3,result3)=>{
                        if(err3){
                            console.log(err3);
                        }
                        else{
                            res.send(result3);
                        }
                    })
                }
            })
        }
    })
        }
    })
    
})
router.get('/genres/:genre',(req,res)=>{
    const genre = req.params.genre;

    db.query("select * from uploads where genre=?",genre,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})
router.get('/search/:title',(req,res)=>{
    const title = req.params.title.toLowerCase();
    console.log(title);
    db.query("select * from uploads where title=?",title,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
})
router.get('/profileuploads/:name',(req,res)=>{
    const name = req.params.name;

    db.query("select * from uploads where author = ?",name,
    (err,result)=>{
        
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})
router.delete('/deletepost/:postid',(req,res)=>{
    const id = req.params.postid;

    db.query("Delete from uploads where id =?",id,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
           res.send("success")
        }
    })
})
router.get('/totalcount/:name',(req,res)=>{
    const name = req.params.name;

    db.query("select count(id) as total from uploads group by author having author= ?",name,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
           res.send(result);
        }
    })
})
router.get('/totallikes/:name',(req,res)=>{
    const name = req.params.name;

    db.query("select sum(like2) as likes from uploads group by author having author= ?",name,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
           res.send(result);
        }
    })
})
router.get("/getuser/:id",(req,res)=>{
    const id=req.params.id;
    db.query("select author from uploads where id=?",id,(err,result)=>{
        res.send(result);
    })
})

module.exports = router