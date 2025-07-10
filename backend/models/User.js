const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email : {
        type : String ,
        required : true ,
        lowercase : true ,
        unique : true 
    } ,
    password : {
        type : String , 
        required : true 
    } ,
    firstname : {
        type : String ,
        trim : true 
    } ,
    lastname : {
        type : String ,
        trim : true 
    } ,
    googleId : {
        type : String ,
        unique : true ,
        sparse : true 
    } ,
    isVerified : {
        type : Boolean ,
        default : false
    } ,
    lastActive : {
        type : Date ,
        default : Date.now
    }
});

//Need to add a middleware to hash the password before saving
userSchema.pre('save' , async function(next) {
    if(!this.isModified('password')) return next() ;    //What is this way of writing this.something ?
    try{
        const salt = await bcrypt.genSalt(12) ;
        this.password = await bcrypt.hash(this.password, salt) ;
        next() ;
    }catch(err){
        next(err) ; //This will pass the error to the next middleware or error handler
    }
});

//Need a compare password method to compare the password with the hashed password
userSchema.methods.comparePassword = async function(candidatePassword){
    if(!this.password) return false ;
    return await bcrypt.compare(candidatePassword, this.password) ;
}

//Need to set how to send the the schema to the client
userSchema.methods.toJSON = function(){
    const userObject = this.toObject() ; // Convert mongoose document to plain object
    delete userObject.password ; // Remove the password field
    return userObject ; // Return the modified object
}

module.exports = mongoose.model('User' , userSchema);