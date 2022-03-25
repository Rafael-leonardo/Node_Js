const express = require('express')
const server = express()
const bodyParser = require("body-parser")
const db = require("./models/model")

server.use(bodyParser.urlencoded({ extended:false }))
server.use(bodyParser.json())

const user = []

server.get('/user', (req, res) => {
    return res.json(user)
})

server.get('/user/:index', (req, res) => {
    return res.json(req.user)
})

server.post('/user', (req, res) => {
    const { name } = req.body
    user.push(name)

    return res.json(user)

})

server.put('/user/:index', (req, res) => {
    const { index } = req.params
    const { name } = req.body
    
    user[index] = name
    
    return res.json(user)

})

server.delete('/user/:index', (req, res) => {
    const { index } = req.params
        
    user.splice(index, 1)
        
    return res.send()
})

db.run()
server.listen(3000)