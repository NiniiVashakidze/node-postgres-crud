
const express = require('express')
require('dotenv').config();
const bodyParser = require('body-parser')
const app = express()
const port = 3000



// to get all the exported files from queries.js file is needed and is assigned to a variable

const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

// for each endpointare set : HTTP request method, the endpoint URL path, relevant function

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})



