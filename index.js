//imports
const server = require('./api/server');


//Server Listen
const PORT = process.env.PORT || 1000;

server.listen(PORT, ()=>{
    console.log(`Server is running on PORT : ${PORT}...`)
})
