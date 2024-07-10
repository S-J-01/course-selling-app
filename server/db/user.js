const mongoose = require ('mongoose');
const COURSE = require('./course');


const userSchema = new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'COURSE'
    }]
});

module.exports= mongoose.model('USER',userSchema);