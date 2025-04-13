const User = require("../models/usermodel")
const jwt = require("jsonwebtoken")

const authenticateUser = (req, res, next) => {
    const token = req.headers["authorization"]

    if(!token){
        return res.status(400).json({errors: "jwt token not found"})
    }
    try{
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            id : tokenData.id,
            role : tokenData.role,
        }
        next()
    } catch(err) {
        //console.log(err)
        res.status(401).json({errors : err})
    }
}


const authorization = (roles) => {
    return (req, res, next) => {
      if (roles.includes(req.user.role)) {
        next();
      } else {
        res.status(403).json({ errors: "you are not authorized" });
      }
    };
  };
  

module.exports ={
    authenticateUser : authenticateUser,
    authorization : authorization
}