// import all required dependencies

let express = require("express");
let app     = express();
const {data: MODULE_DATA} = require("./root/data");
let Route = require("./Routers/routers");
let cookie_parser = require("cookie-parser");
let Auth = require("./middlewares/auth");
let session = require("express-session");
let LoginPage = require("./pages/LoginPage");
let RegisterPage = require("./pages/RegisterPage");

// main app

class MainApp {

    static BuiltinMiddewares() {
        app.use(express.urlencoded({extended: true}));
        app.use(express.json());
        app.use(cookie_parser());
        app.use(session({
            secret: 'funny-backend-mode',
            resave: false,
            saveUninitialized: false
          }));
    }

    static CustomMiddewares() {

        app.use((req,res,next)=>{
                console.log(req.url);
                next();
            });
            
    }

    static SearchRoutes() {

        app.use(express.static("./clientImages/"));
        app.get("/signup",Auth,RegisterPage);
        app.get("/signin",Auth,LoginPage);
        app.use(Route);
        app.use(Auth);
        app.use((req,res)=> res.status(404).end("Not Found!"));
        
    }

    static async StartApp() {
        // connect database 
       await require("./connection/conn").ConfigDatabase();
      
       app.listen(MODULE_DATA["app-port"], () => {
            console.log(`-> Attached on (${MODULE_DATA["app-port"]}) port`);
        })
    }
}


MainApp.BuiltinMiddewares();
MainApp.CustomMiddewares();
MainApp.SearchRoutes();
MainApp.StartApp();