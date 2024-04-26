// import necessary packages
let jwt = require("jsonwebtoken");
let crypto = require("crypto");
let bcrypt = require("bcryptjs");
let ClientsModel = require("../model/clientsModel");
let {data: MODULE_DATA} = require("../root/data");


class Controllers {
    // check empty fields;
    static isAnyEmpty(...fields) {
        let all_fields = fields;
        all_fields = all_fields.filter((field) => field.length == 0);
        if(all_fields.length > 0) return true;
        return false;
    }

    static isEmail(email) {
        let email_rexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
       return email_rexp.test(email);
    }

    async Register(req,res,errorResponse) {

        try {

            let {
                username,
                email,
                telephone,
                gender,
                password
            } = req.body;

            if(!Controllers.isEmail(email)) {
                req.AttachedError = {isServerError: false,error: "Invalid email."};
                return errorResponse();
            }
         
            if( !username ||
                !email ||
                !telephone ||
                !gender ||
                !password) {
                    req.AttachedError = {isServerError: false,error: "Please fill all required fields."};
                    return errorResponse();
                }

            if(Controllers.isAnyEmpty(
                username,
                email,
                telephone,
                gender,
                password)) {
                    req.AttachedError = {isServerError: false,error: "Please fill all required fields."};
                   return errorResponse();
                }
                

            let is_email_exists = await ClientsModel.findOne({
                where: {
                    email: email
                }
            });
            
            
            if(is_email_exists) {
                return res.status(200).json({
                    status: false,
                    message: "Email already taken"
                });
            }
            let hashed_password = await bcrypt.hash(password,10);

            let client = await ClientsModel.create({
                id: crypto.randomBytes(30).toString("hex"),
                username: username,
                email: email,
                telephone: telephone,
                gender: gender,
                password: hashed_password
            });

            // perform other actions or
           return res
            .status(200)
            .json(
                {
                    id: client.id,
                    username: client.username,
                    email: client.email,
                    telephone: client.telephone,
                    gender: client.gender,
                    entered_password: password,
                    hashed_password: client.password
                }
            );
            
        }
        
        catch(serverError) {
            req.AttachedError = {isServerError: true,error: "unexpected error occured try again later."};
            errorResponse();
        }

    }

    async Login(req,res,errorResponse) {
        // declare error message allow user to select login with number or email.
        
        try {
            let errors = ["No User With This Email","No User With This Phone Number."];
            if(req.session.loggedin_client) {
                return res.status(200).json(
                    {
                        message: "Another account working Logout first."
                    }
                )
            }

        if(req.body.email && req.body.password){

            if(!Controllers.isEmail(req.body.email)) {
                req.AttachedError = {isServerError: false,error: "Invalid Email"};
                return await errorResponse();
            }

            return await findByEmail();

        }
        
        else if(req.body.telephone && req.body.password){
           return findByPhone();
        }
        
        else{
            req.AttachedError = {isServerError: false,error: "Please fill all required fields."};
            return errorResponse();
        }

       async function findByEmail() {
            let is_user_exists = await ClientsModel.findOne({
                where: {
                   email: req.body.email
                }
            });

            if(is_user_exists){
                // other actions may be here.
            let check_pass = await bcrypt.compare(req.body.password,is_user_exists.password);
          
            if(check_pass){

            let acces_token = jwt.sign({
                status: true,
                id: is_user_exists.id,
                username: is_user_exists.username,
                email: is_user_exists.email,
                telephone: is_user_exists.telephone,
                scenario: "Logged in",
                logged_in_with: "Email"
            },
             MODULE_DATA["jwt-secret"],
            {expiresIn: "7d"});


            res.cookie("jwt_token",acces_token,{
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true
            });

            req.session.loggedin_client =  is_user_exists.id;

            return res.
            status(200)
            .json( {
                status: true,
                id: is_user_exists.id,
                username: is_user_exists.username,
                email: is_user_exists.email,
                telephone: is_user_exists.telephone,
                scenario: "Logged in",
                logged_in_with: "Email"
            });

            }

            return res.
            status(404)
            .json( {
                status: false,
                error: "Invalid password."
            });

            }
            return res.
            status(404)
            .json( {
                status: false,
                error: errors[0]
            });
        }

       async function findByPhone() {
            let is_user_exists = await ClientsModel.findOne({
                where: {
                telephone: req.body.telephone
                     
                }
            });

            if(is_user_exists){
                // other actions may be here.
            let check_pass = await bcrypt.compare(req.body.password,is_user_exists.password);
            if(check_pass){

                let acces_token = jwt.sign({
                    status: true,
                    id: is_user_exists.id,
                    username: is_user_exists.username,
                    email: is_user_exists.email,
                    telephone: is_user_exists.telephone,
                    scenario: "Logged in",
                    logged_in_with: "Telephone Number"
                },
                 MODULE_DATA["jwt-secret"],
                {expiresIn: "7d"});
    
                res.cookie("jwt_token",acces_token,{
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    httpOnly: true
                });
    
                req.session.loggedin_client =  is_user_exists.id;

            return res.
            status(200)
            .json( {
                status: true,
                id: is_user_exists.id,
                username: is_user_exists.username,
                email: is_user_exists.email,
                telephone: is_user_exists.telephone,
                scenario: "Logged in",
                logged_in_with: "Telephone Number"
            });

            }

            return res.
            status(404)
            .json( {
                status: false,
                error: "Invalid password."
            });

            }

            return res.
            status(404)
            .json( {
                status: false,
                error: errors[1]
            });
        }

        }
        catch(error) {
            req.AttachedError = {isServerError: true,error: "unexpected error occured try again later."};
            errorResponse();
        }


    }
    async Logout(req,res,errorResponse) {
        
        try {
            if(!req.session.loggedin_client){
                return res.status(403).json({
                    error: "not logged in before"
                })
            }
            req.session.destroy(err=> {
                if(err) throw "0";
                res.cookie('jwt_token', '', { expires: new Date(0), httpOnly: true });
                res.status(200).json({
                    message: "Logout successfully."
                });
            })
        }
        catch(e){
            req.AttachedError = {isServerError: true,error: "unexpected error occured try again later."};
            errorResponse();
        }
    }
    
}

module.exports = new Controllers();