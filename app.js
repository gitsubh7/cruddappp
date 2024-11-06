import express from 'express';
import bodyParser from 'body-parser';
import {db} from './utils/db.js';
import studentRoute from './routes/studentRoutes.js';
import dotenv from 'dotenv';

dotenv.config('./.env');
const app=express();
app.use(bodyParser.json());
const router=express.Router();

router.use('/students',studentRoute);
app.use('/api',router);

db()
    .then(()=>{
    const PORT = process.env.PORT || 3000;
    app.listen(PORT,()=>{
        
        console.log(`Server is running on port ${PORT}`);
        
    });
}).catch((err)=>{
        console.log('Error while connecting to db',err);
    });


export {app};