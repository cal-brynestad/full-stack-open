const infoRouter = require('express').Router()
const Person = require('../models/person')

infoRouter.get('/', (request, response) => {
  const currentDate = new Date().toUTCString()

  Person.countDocuments({}).then(count => {
    response.send(`Phonebook has info for ${count} people <br><br> ${currentDate}`)
  })
})

module.exports = infoRouter