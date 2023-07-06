import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from '../models/userModel.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({username });
   
     if(user)
      {
        return res.json({message : "user already registered"})
      }

      const hashedPassword = await bcrypt.hash(password,10);

      const newUser = new userModel({username : username ,  password :hashedPassword});
      await newUser.save();
      
      res.status(201).json({ message: 'User created' });
    // res.json(user);
});



router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({username });

    if(!user)
     {
        return res.json({message : "user doesnt exsist"});
     }

     const isPasswordvalid = await bcrypt.compare(password,user.password);

     if(!isPasswordvalid)
     {
        return res.json({message :"Credentials doesnt match"});
     }

     const token  =  jwt.sign({id:user._id},"secret");
     res.json({token,userID : user._id});

});

export { router as userRouter };
