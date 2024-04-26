
let Route = require("express").Router();
let { Register,Login, Logout } = require("../controllers/clientAuth");
let multer = require("multer");
let crypto = require("crypto");
let HandleError = require("../middlewares/errorHandler");

// let disk_storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, '../clientImages') 
//     },
//     filename: (req,file,cb) =>{
//         cb(null,`${crypto.randomBytes(32).toString("hex")}.${file.originalname.split(".").pop().toLocaleLowerCase()}`);
//     }
// });

// let save_file = multer({storage: disk_storage});

Route.post("/api/app/register",Register,HandleError);
Route.post("/api/app/login",Login,HandleError);
Route.get("/api/app/logout",Logout,HandleError);

module.exports = Route;
 