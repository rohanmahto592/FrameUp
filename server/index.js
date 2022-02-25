const express = require("express");
const app = express();

const cors = require("cors");
const mysql = require("mysql");
app.use(cors());
app.use(express.json());
const Router = require("./routes/User");
app.use('/user',Router);

const UploadRouter = require('./routes/Upload');
app.use('/upload',UploadRouter);
port = 3001
app.listen(port,()=>console.log(`port is listening at ${port}`))

