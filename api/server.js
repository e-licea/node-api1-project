
const express = require('express');
const data = require('../data/data');
const shortid = require('shortid');
const e = require('express');
//middleware
const server = express();
server.use(express.json());



//GET - initial server request
server.get('/api', (req, res)=>{

    res.status(200).json({message: 'Welcome! request an endpoint to get started!'});

})

//POST - creates new user and adds to the list
server.post('/api/users', (req, res) =>{
    if (req.body.bio && req.body.name !== null ){
        const newUser = {
            id: shortid.generate(),
            name: req.body.name,
            bio: req.body.bio
        }
    
        data.push(newUser);
        console.log(`new user was created : `, newUser)
        res.json(newUser)
    }else{
       res.status(500).json(`Please include both a new user name and bio`)
    }


})

//GET - gets full list of users
server.get('/api/users', (req, res) => {


    res.status(200).json(data)
})

//GET - gets user by id
server.get('/api/users/:id', async (req, res)=>{
    try{
        const userIndex = await data.findIndex( function(user){
            return user.id === req.params.id
        })

        if(req.params.id === data[userIndex].id ){
            res.json(data[userIndex])
            console.log(`User has been found! : `, data[userIndex])

        }
        
    }catch(err){
        res.json({errorMessage: `${err}`})
    }

    

})

//DELETE - deletes user if id is found
server.delete('/api/users/:id', async (req, res)=>{
    try{
        const userIndex = await data.findIndex( function(user){
            return user.id === req.params.id
        })

        if(req.params.id === data[userIndex].id ){
            data.slice(data[userIndex], data[userIndex]++)
            res.json(data[userIndex])
            console.log(`User has been found and is set to delete from user list!`)

        }
        
    }catch(err){
        res.json({errorMessage: `${err}`})
    }

})

//PUT - updates bio and name for user
server.put('/api/users/:id', async (req, res)=>{
    try{
        const userIndex = await data.findIndex( function(user){
            return user.id === req.params.id
        })
        
        data[userIndex].name = req.body.newName
        data[userIndex].bio = req.body.newBio
    }catch(err){
        res.json({errorMessage: `${err}`})
    }finally{
        
        res.json({message: 'success'})
    }

})

module.exports = server; 

