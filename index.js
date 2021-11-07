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


app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/api/info',(req,res) =>{
      const info = `phoneBook has info of ${persons.length} contacts. \n`
      + `${new Date()}`  
      res.send(info)
    })

    // app.post('/api/persons/:id', (req,res) => {
    //   const body = req.body;
    //   if(!body.content){
    //       return res.status(400).json({error:"content missing"})
    //   }
    //   const info = {
    //     content: body.content,
    //     important: body.important || false,
    //     date: new Date(),
        
    // }
    // res.json(info)
    // })
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
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })