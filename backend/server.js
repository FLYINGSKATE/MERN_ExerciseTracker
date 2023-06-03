const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {ServerApiVersion } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

//Middle ware
app.use(cors());

//to parse json and route and navigate apis etc
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB Database Connection Established successfully");
})


const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);


app.listen(port,()=>{
    console.log(`Server is Running on Port: ${port}`);
})