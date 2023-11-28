const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('postData', (request) => JSON.stringify(request.body))

app.use(express.json())
app.use(morgan('tiny', { skip: (req) => req.method === 'POST' }))
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :postData', {
    skip: (req) => req.method !== 'POST',
    })
  )

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// The first request parameter contains all of the information of the HTTP request, and the second response parameter is used to define how the request is responded to
app.get('/api/persons', (request, response) => {
    console.log(request.headers)
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    console.log(request.headers)
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
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

    response.send(`Phonebook has info for ${persons.length} people <br><br> ${currentDate}`)
})

const generateId = () => {
    const id = Math.floor(Math.random() * 10000)
    return id
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    const duplicate = persons.some(person => person.name === body.name)
    if (duplicate) {
        return response.status(400).json({ 
            error: `${body.name} already exists in the phonebook`
          })
    }
  
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
  
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})