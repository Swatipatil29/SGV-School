const { isISO8601 } = require('validator')
const moment = require('moment')

const eventCalenderValidationSchema = ({
  fromdate: {
    notEmpty: {
      errorMessage: 'fromdate is required',
    },
    custom: {
      options: (value) => {
        if (!isISO8601(value)) {
          throw new Error('Invalid date format. Use ISO8601 format.')
        }

        const inputDate = moment(value)
        const today = moment().startOf('day')

        if (inputDate.isBefore(today)) {
          throw new Error('fromdate cannot be in the past.')
        }

        return true
      }
    }
  },
  todate: {
    notEmpty: {
      errorMessage: 'ToDate is required',
    },
    custom: {
      options: (value) => {
        if (!isISO8601(value)) {
          throw new Error('Invalid date format. Use ISO8601 format.')
        }

        const inputDate = moment(value)
        const today = moment().startOf('day')

        if (inputDate.isBefore(today)) {
          throw new Error('ToDate cannot be in the past.')
        }

        return true
      }
    }
  },
  eventType: {
    notEmpty: {
      errorMessage: 'Event type is required',
    }
  },
  description: {
    notEmpty: {
      errorMessage: 'Description is required',
    }
  }
})

const newsValidationSchema = ({
  date: {
    custom: {
      options: (value) => {
        if (!isISO8601(value)) {
          throw new Error('Invalid date format. Use ISO8601 format.')
        }

        const inputDate = moment(value)
        const today = moment().startOf('day')

        if (inputDate.isBefore(today)) {
          throw new Error('Date cannot be in the past.')
        }

        return true
      }
    }
  },
  title: {
    notEmpty: {
      errorMessage: 'Event type is required',
    }
  },
  description: {
    notEmpty: {
      errorMessage: 'Description is required',
    }
  }
})

module.exports = {
  eventCalenderSchema: eventCalenderValidationSchema,
  newsValidationSchema :newsValidationSchema
}
