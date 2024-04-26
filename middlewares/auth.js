let jwt = require("jsonwebtoken");
let {data: MODULE_DATA} = require("../root/data")

async function Auth(req,res,next) {

    try {
        
        if(!req.cookies.jwt_token) return next();
        
        if(req.session.loggedin_client) {
            
            let client_data = await jwt.verify(req.cookies.jwt_token,MODULE_DATA["jwt-secret"]);
    
            if(client_data) {
    
                return res.status(200).json({
                    greeting: `HELLO  ${client_data.username}  WELCOME AGAIN!`,
                    ...client_data,
                    "TIME": new Date().toDateString()
                });
    
            }
    
        }
        else if(req.cookies.jwt_token){
    
            let client_data = await jwt.verify(req.cookies.jwt_token,MODULE_DATA["jwt-secret"]);

            if(client_data) {
                req.session.loggedin_client =  client_data.id;
                return res.status(200).json({
                    greeting: `HELLO  ${client_data.username}  WELCOME AGAIN!`,
                    ...client_data,
                    "TIME": new Date().toDateString()
                });
    
            }
    
        }
        return res.status(200).json({
            message: "Please login first!"
        });
    }

    catch(error) {
        return res.status(500).json({
           error: "unexpected errors occured try later."
        });
    }
}

module.exports = Auth;