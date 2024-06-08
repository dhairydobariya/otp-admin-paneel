const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    blogpath : {
        type: String,
        required : true  
    },
    blog_discription  : {
        type : String,
        required : true  
    },
    blogtitle : {
        type : String,
        required : true  
    } ,
    userId : {
        type : String ,
    }
});

const user_blog = mongoose.model('user-blog-section' , userschema);

module.exports = user_blog;
