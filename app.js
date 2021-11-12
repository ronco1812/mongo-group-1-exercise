
require('dotenv').config()
const Person = require('./models/person')
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors');
const path = require('path');

app.use( morgan(function (tokens, req, res) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body.content)
  }
  else {return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')}
}))

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./front/index.html'));
})
app.use('/', express.static('front'))
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
  })

  app.get('/api/info',(req,res) =>{
      const info = `phoneBook has info of ${persons.length} contacts. \n`
      + `${new Date()}`  
      res.send(info)
    })
    app.get('/api/persons/:id', (req, res) => {
  Person.findById(request.params.id).then(person => {
    res.json(person)
  })
})

app.delete('/api/persons/:name', (req, res) => {
  const {name} = req.params
  Person.find({name})
  .then(person => {
    if (person[0]) {
    Person.deleteOne({name}).then(() => res.json(person))
  
      } else {
        res.status(404).end() 
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted name' })
    })
  }) 
  
  app.post('/api/persons', (req, res,next) => {
    const body = req.body
    
    if (body.content === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }
    
    const person = new Person({
        name: body.content.name,
        number: body.content.number,
      })
    
      person.save().then(savedPerson => {
        res.json(savedPerson)
      }).catch(error => next(error))
    })
    app.put('/api/persons/:name', (req, res, next) => {
      const body = req.body
      const person = {
        name: body.content.name,
        number: body.content.number,
      }
      Person.findOneAndUpdate(req.params, person, { new: true })
      .then(updatedPerson => {
        res.json(updatedPerson)
        })
        .catch(error => next(error))
      })

      const unknownEndpoint = (req, res) => {
        res.status(404).send({ error: 'unknown endpoint' })
      }
      app.use(unknownEndpoint)
      ///

      const errorHandler = (error, req, res, next) => {
        console.error(error.message)
      
        if (error.name === 'CastError') {
          return res.status(400).send({ error: 'malformatted id' })
        } else if (error.name === 'ValidationError') {
          return res.status(400).json({ error: error.message })
        }
        next(error)
      }
      app.use(errorHandler);
      ////
      const PORT = process.env.PORT
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })