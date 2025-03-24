require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('./config/db');
const userroute = require('./routes/user.routes')
const cors = require('cors')

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors())
app.get('/',(req,res)=>{
    res.send('node is running');
})

app.use('/api/', userroute)

app.listen(process.env.PORT,()=>{
    console.log('app listeining on port'+ process.env.PORT);
    
})