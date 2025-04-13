const mongoose = require('mongoose')

const configureDb = async () =>  {
 const db = await mongoose.connect('mongodb://127.0.0.1:27017/school-app')

 try{
    console.log('Connected to db')
 }
 catch(e) {
    console.log("error while connecting to db")
 }
}

module.exports = configureDb