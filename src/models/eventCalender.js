const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const eventCalenderSchema = new Schema({
  fromdate: Date,
  todate : Date,
  eventType: String,
  description: String
}, { timestamps: true });

const EventCalender = model('EventCalender', eventCalenderSchema);

module.exports = EventCalender;