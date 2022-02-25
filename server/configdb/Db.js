const mysql = require("mysql");
const db = mysql.createConnection({
    user:"root",
    host: "localhost",
    password: "password",
    port: 3306,
    database: "youtube",
    insecureAuth: true
})
module.exports = db