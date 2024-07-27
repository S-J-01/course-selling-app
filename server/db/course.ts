import mongoose  from 'mongoose';
const courseSchema = new mongoose.Schema({

    title:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    imageLink:{
        type:String
    },
    published:{
        type:Boolean
    },
    courseID:{
        type:Number
    }
});
export default mongoose.model('COURSE',courseSchema);