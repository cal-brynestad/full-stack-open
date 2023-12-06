require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token('postData', (request) => JSON.stringify(request.body))

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))
app.use(morgan('tiny', { skip: (req) => req.method === 'POST' }))
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :postData', {
    skip: (req) => req.method !== 'POST',
    })
  )

  app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
  })

// The first request parameter contains all of the information of the HTTP request, and the second response parameter is used to define how the request is responded to
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    console.log(request.headers)

    Person.findById(request.params.id).then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
})

app.delete('/api/persons/:id', (request, response) => {
    console.log(request.headers)
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/info', (request, response) => {
    console.log(request.headers)
    const currentDate = new Date().toUTCString();

    response.send(`Phonebook has info for NEEDS TO BE IMPLEMENTED people <br><br> ${currentDate}`)
})

const generateId = () => {
    const id = Math.floor(Math.random() * 10000)
    return id
}

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
      }
  
    const person = new Person({
      name: body.name,
      number: body.number,
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
})

// Middleware functions have to be taken into use before routes if we want them to be executed before the route event handlers are called
// Because we want the unknownEndpoint middleware to only be called if the endpoint doesn't exist, we take it into use at the end of the file
// This is a middleware function that is only called if no route handles the HTTP request
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})