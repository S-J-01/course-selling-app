import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    username : {
        type : String
    },
    password: {
        type:String
    }
});
export default  mongoose.model('ADMIN',adminSchema);