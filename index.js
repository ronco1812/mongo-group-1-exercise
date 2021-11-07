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

// app.post('/api/info', (req,res) => {
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

app.get('/api/info',(req,res) =>{
    const info = `phoneBook has info of ${persons.length} contacts. \n`
     + `${new Date()}`  
        res.send(info)
})
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })