import  express from "express";
import { recipeModel } from "../models/recipeModel.js";
import { userModel } from "../models/userModel.js";
 

const router = express.Router();

router.get('/',async (req,res)=>{
  try {
    
    const response  = await recipeModel.find({});
     res.json(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }

});

router.post('/addRecipe',async (req,res)=>{
    
    const recipe =  new recipeModel(req.body);

    try {
        const response =  await recipe.save();
        res.json(response);
       
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  
  });


  //user will be able to save recipe 
  router.put('/saveRecipeToUser',async (req,res)=>{
      
    console.log(req.body.userID);
    try {
    const recipe =  await recipeModel.findById(req.body.recipeId);
    const user =  await userModel.findById(req.body.userID);



    user.savedRecipes.push(recipe);
    await user.save();
  
        res.json({savedRecipes :user.savedRecipes});
       
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  
  });


  //get all recipes of user 

  router.get("/savedRecipes/ids/:userID",async (req,res)=>{
   try {
    const user =  await userModel.findById(req.params.userID);
    res.json(user?.savedRecipes);

   } catch (err) {
    res.json(err);
   }
  });


  router.get("/savedRecipes/:userID",async (req,res)=>{
    try {
     const user =  await userModel.findById(req.params.userID);
      const savedRecipes = await recipeModel.find({
      _id: { $in: user.savedRecipes },
    });
     res.json(savedRecipes);
     
    } catch (err) {
     res.json(err);
    }
   })
 


export {router as recipeRouter} ;