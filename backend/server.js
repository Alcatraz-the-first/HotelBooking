const express = require('express') ;
const cors = require('cors') ;
const mongoose  = require('mongoose') ;
require('dotenv').config() ;

const app = express() ;
const port = process.env.PORT ;

app.use(cors()) ;
app.use(express.json()) ;

app.use('/api', require('./routes/api'));
app.use('/api', require('./routes/images'));
app.use('/api', require('./routes/hotelDetails')) ;
app.use('/api', require('./routes/auth')) ;


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI , {
    useNewUrlParser : true ,
    useUnifiedTopology :true
})
.then(() => {console.log("MongoDB Connected at : " + process.env.MONGO_URI) ;})
.catch(err => console.error("MongoDB connection error: ", err)) ;

app.get('/', (req,res)=>{
    res.send('Welcome to the backend server!') ;
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`) ;
});