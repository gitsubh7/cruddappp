import mongoose,{Schema} from "mongoose";
const studentSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    rollNumber:{
        type:String,
        required:true,
        unique:true
    },
    branch:{
        type:String,
        required:true
    },
    cgpa:{
        type:String,
        required:true
    }

},
{
    timestamps:true
})


export const Student=mongoose.model('Student',studentSchema);