const EventCalender = require('../models/eventCalender')
const News = require("../models/newsMOdel")
// const mongoose= require('mongoose')

const _=require('lodash')
const {validationResult} = require('express-validator');
const { eventCalenderSchema } = require('../validations/eventCalenderValidation');

const eventCtrl = {}

eventCtrl.addEvent = async (req, res) => {
  const errors = validationResult(req);
  const addToNews = req.body.addToNews === true || req.body.addToNews === 'true';
  const hasDate = !!req.body.date;
  const hasRange = !!req.body.fromdate || !!req.body.todate;

  if (!errors.isEmpty() && hasDate) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = _.pick(req.body, ['eventType', 'fromdate', 'todate', 'description', 'date']);

  try {
    const eventCalender = new EventCalender({
      eventType: body.eventType,
      description: body.description,
      date: body.date,
      fromdate: body.fromdate,
      todate: body.todate
    });

    await eventCalender.save();

    if ((!hasDate && !hasRange) || addToNews) {
      const news = new News({
        title: body.eventType,
        description: body.description,
        fromdate: body.fromdate || Date.now(),
        todate: body.todate
      });

      await news.save();
    }

    return res.status(200).json({ message: 'Data saved successfully', eventCalender });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};


  module.exports = eventCtrl