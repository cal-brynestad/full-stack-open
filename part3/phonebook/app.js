const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const personsRouter = require('./controllers/persons')
const infoRouter = require('./controllers/info')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

morgan.token('postData', (request) => JSON.stringify(request.body))
app.use(morgan('tiny', { skip: (req) => req.method === 'POST' }))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :postData', {
    skip: (req) => req.method !== 'POST',
  })
)

app.use('/api/persons', personsRouter)
app.use('/info', infoRouter)

// Middleware functions have to be taken into use before routes if we want them to be executed before the route event handlers are called
// Because we want the unknownEndpoint middleware to only be called if the endpoint doesn't exist, we take it into use at the end of the file
// This is a middleware function that is only called if no route handles the HTTP request
app.use(middleware.unknownEndpoint)
// this has to be the last loaded middleware.
app.use(middleware.errorHandler)

module.exports = app