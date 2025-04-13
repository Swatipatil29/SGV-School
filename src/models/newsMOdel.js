const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const newsSchema = new Schema({
  fromdate: Date,
  todate : Date,
  title : String,
  description: String
}, { timestamps: true });

const news = model('news', newsSchema);

module.exports = news;