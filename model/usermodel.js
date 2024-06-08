const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    userpath : {
        type: String
    }
    ,username : {
        type : String,
        required : true  
    },
    useremail  : {
        type : String,
        required : true  
    },
    password : {
        type : String,
        required : true  
    } ,
    token : {
        type : String,
        required: false
    }
});

const user_blog = mongoose.model('user-blog' , userschema);

module.exports = user_blog;
