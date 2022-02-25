const mysql = require("mysql");
const db = mysql.createConnection({
    user:"root",
    host: "localhost",
    password: "******",
    port: 3305,
    database: "youtube",
    insecureAuth: true
})
module.exports = db
