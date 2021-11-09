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
  res.sendFile('./front/index.html');
})
app.use('/', express.static('front'))
app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.get('/api/info',(req,res) =>{
      const info = `phoneBook has info of ${persons.length} contacts. \n`
      + `${new Date()}`  
      res.send(info)
    })
app.get('/api/persons/:id', (req, res) => {
        const id = Number(req.params.id)
        const person = persons.find(person => person.id === id)
        if(person){
            res.json(person)
        }
        else{
            res.status(400).send('no such contact').end()
        }
      })

app.delete('/api/persons/:id', (req, res) => {
        const id = Number(req.params.id)
        persons = persons.filter(person => person.id !== id)
      
        res.status(204).end()
      })


      const generateId = () => {
        const maxId = persons.length > 0
          ? Math.max(...persons.map(n => n.id))
          : 0
        return maxId + 1
      }
      const isExist =(Ename) => {
        for(let i = 0; i<persons.length; i++) {
          if (persons[i].name === Ename) {
            return true;
        }
      }
      return false;
    }
      
 app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }
  if(!body.content.name||!body.content.number){
    return res.status(400).json({error:'missing name or number'})
  }
  if(isExist(body.content.name)){
    return res.status(400).json({error:'name already exist'})
  }

  const person = {
    id: generateId(),
    name: body.content.name,
    number: body.content.number
  }

  persons = persons.concat(person)

  res.json(person)
      })

  const PORT = process.env.PORT || 3001
   app.listen(PORT, () => {
         console.log(`Server running on port ${PORT}`)
      })