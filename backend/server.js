const express = require('express') ;
const cors = require('cors') ;
require('dotenv').config() ;

const app = express() ;
const port = process.env.PORT ;

app.use(cors()) ;
app.use(express.json()) ;

const apiRoutes = require('./routes/api');
const apiImages = require('./routes/images');
app.use('/api', apiRoutes);
app.use('/api', apiImages);

app.get('/', (req,res)=>{
    res.send('Welcome to the backend server!') ;
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`) ;
});