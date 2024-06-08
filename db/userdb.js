const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/blog-post-database').then(() => {
    console.log("your database is connected");
}).catch((err) =>{
    console.log('db err' , err);
})

module.exports = mongoose ; 
