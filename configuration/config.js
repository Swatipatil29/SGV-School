const mongoose = require('mongoose');

const configureDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://avinashkempi:RcbCsk-mongo123@schoolapp.uhmjiaw.mongodb.net/sgv-school?retryWrites=true&w=majority&appName=SchoolApp');
    console.log('Connected to db');
  } catch (e) {
    console.log('Error while connecting to db:', e.message);
  }
};

module.exports = configureDb;
