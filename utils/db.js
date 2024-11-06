import mongoose from "mongoose";

export const db=async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            // useCreateIndex:true
        });
        console.log('Connected to db');
    }catch(err){
        console.log('Error while connecting to db',err);
    }
}