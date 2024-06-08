const mongoose = require('mongoose')

const profileschema = mongoose.Schema({
    profilepath : {
        type: String,
        required : true  
    },
    city : {
        type : String,
        required : true     
    },
    skils: {
        type: String,
        required: true,
    },
    profilename  : {
        type : String,
        required : true  
    },
    profilebio : {
        type : String,
        required : true  
    } ,
    userId : {
        type : String ,
    }
});

const profile_blog = mongoose.model('profile_section' , profileschema);

module.exports = profile_blog;
