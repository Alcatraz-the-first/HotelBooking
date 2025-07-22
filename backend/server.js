const express = require('express') ;
const cors = require('cors') ;
const mongoose  = require('mongoose') ;
const cookieParser = require('cookie-parser') ;
require('dotenv').config() ;

const app = express() ;
const port = process.env.PORT ;
app.use(cors({
  origin: 'https://lads-nt69.onrender.com', // <-- your React app's URL
  credentials: true
}));
app.use(express.json()) ;
app.use(cookieParser()) ;

app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth')) ;
app.use('/booking', require('./routes/booking'));
app.use('/profile', require('./routes/profile')) ;


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