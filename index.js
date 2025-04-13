const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;
const mongodb = require("./configuration/config")
const {checkSchema} = require('express-validator')
const cors = require("cors")

//authentication

const {authorization, authenticateUser } =  require("./src/middleware/auth")

//import of controller
const userCtrl = require("./src/controllers/usercontroller")
const eventCtrl = require("./src/controllers/eventController")

app.use(express.json())
mongodb()
app.use(cors())

//validation
const {userValidationSchema, userLoginValidationSchema} = require("./src/validations/uservalidation")
const { eventCalenderSchema, newsValidationSchema } = require("./src/validations/eventCalenderValidation")

//routes
app.post("/api/user/register", checkSchema(userValidationSchema), userCtrl.register)
app.post("/api/user/login", checkSchema(userLoginValidationSchema), userCtrl.login)

//notification
app.post("/api/addEvent",authenticateUser,authorization(['Manager']),checkSchema(eventCalenderSchema), eventCtrl.addEvent)

app.get('/', (req, res) => {
    res.send('Hello from Express!');
  });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  })