import mongoose from 'mongoose';



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

export default  mongoose.model('USER',userSchema);