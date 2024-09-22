const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url).then(() => {
    console.log("your database is connected");
}).catch((err) =>{
    console.log('db err' , err);
})

module.exports = mongoose ; 
