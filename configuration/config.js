const mongoose = require('mongoose')

const configureDb = async () =>  {
 const db = await mongoose.connect('mongodb+srv://avinashkempi:Rcbcsk@mongodb123@schoolapp.uhmjiaw.mongodb.net/?retryWrites=true&w=majority&appName=SchoolApp')

 try{
    console.log('Connected to db')
 }
 catch(e) {
    console.log("error while connecting to db")
 }
}

module.exports = configureDb