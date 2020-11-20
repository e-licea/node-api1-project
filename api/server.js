
const express = require('express');

//middleware
const server = express();
server.use(express.json());




server.get('/api', (req, res)=>{

    res.json({message: 'Welcome! request an endpoint to get started!'})

})

//POST
server.post('/api/users', (req, res) =>{

    console.log(req.url, req.headers['user-agent'], req.body)

})


module.exports = server; 