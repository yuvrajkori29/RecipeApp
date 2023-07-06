import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { userRouter } from './routes/user.js';
import { recipeRouter } from './routes/recipes.js';




const app = express();
app.use(express.json());
app.use(cors());


app.use('/auth',userRouter);
app.use('/recipes',recipeRouter);


mongoose.connect('mongodb+srv://yuvrajkori29:8D15b8HWVWIJ9sVN@receipe.vrm8trk.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser : true,
    useUnifiedTopology:true,
});


app.get('/',(req,res)=>{
    console.log("hello world ");
})

app.listen('4000',()=>{
    console.log('server is running on 4000');
})

