const User = require("../models/usermodel")
const {validationResult} = require("express-validator")
const _ = require("lodash")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")


const userCtrl = {}

userCtrl.register = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }
     const body = _.pick(req.body,["firstname","lastname","password","confirmpassword","email", "password", "role","phonenumber"])
     try{
         
           const user =  new User(body)
           const salt = await bcryptjs.genSalt()
           const encryptedPassword =  await bcryptjs.hash(user.password, salt)
           user.password = encryptedPassword 

          await user.save()
        return res.json(user)
     }
     catch(e) {
       console.log(e)
       res.status(500).json(e)
     }
}

userCtrl.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const body = _.pick(req.body, ["email", "password"]);
    try {
      const user = await User.findOne({ email: body.email });
      if (!user) {
        return res.status(404).json({ errors: 'Invalid email or password' });
      }

      const password = await bcryptjs.compare(body.password, user.password);
      if(!password){
        return res.status(404).json({ errors: 'Invalid email or password' });
      }
        const tokenData = {
          id: user._id,
          role: user.role,
          
        };
  
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '14d' });
        res.json({ token: token });
      }
     catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  };

  userCtrl.addNotification = async (req, res) => {

  }

   module.exports = userCtrl