const express = require('express');
const cors = require('cors')
const { connection } = require('./db');
const userRoutes = require('./routes/userRoutes');
const noteRoute = require('./routes/notesRoutes');
require('dotenv').config()
const port = process.env.PORT



const app = express();
app.use(cors())
app.use(express.json())

app.use('/user',userRoutes)
app.use('/note', noteRoute)


app.get('/',(req,res)=>{
    res.send("Hello")
})

app.listen(port , async()=>{

    try{
        await connection
        console.log('Database connected');
    }
    catch(error){
        console.log(error);
    }
    console.log('Server is connected on port', port)
})