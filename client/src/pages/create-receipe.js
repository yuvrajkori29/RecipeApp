

import { useState } from "react";
import axios from 'axios';
import { useGetUserId } from "../Components/hooks/useGetUserId.js";
import { useNavigate } from "react-router-dom";

export const CreateReceipe = ()=>{
    const userID = useGetUserId();
    const [recipe,setRecipe] = useState({

        name : "",
        ingredients :  [],
        instructions:"",
        imageUrl : "",
        cookingTime : 0,
        userOwner  : userID
    });

    const navigate = useNavigate()
    const handleChange = (e)=>{
   
        const {name,value} = e.target;
        setRecipe({...recipe,[name]:value});
    }

     

    const handleIngredientChange = (e,idx)=>{

        const {value} = e.target;
        const ingredient =  recipe.ingredients;
        ingredient[idx]= value;
        setRecipe({...recipe,ingredients:ingredient});
       
       }
   


    const addIngredient = ()=>{
        setRecipe({...recipe,ingredients:[...recipe.ingredients,""]})
    }
const handleSubmit =async (e)=>{
    e.preventDefault();
    try {
        await  axios.post('http://localhost:4000/recipes/addRecipe',recipe);
        alert('recipe created');
        navigate('/');
    } catch (error) {
        console.log(error);
    }
    console.log(recipe);
}


    
    return    (
    <div className="create-recipe">
        <h1>CreateReceipe</h1>
        <form onSubmit={handleSubmit}>  
        <label htmlFor="name">Recipe Name</label>
        <input type='text' id="name" name="name" onChange={handleChange}/> 
        <label htmlFor="ingredients">Ingredients</label>
        {
            recipe.ingredients.map((ingredient,idx)=>(
                   <input key={idx} type="text" name="ingredients"
                    value={ingredient} onChange={(e)=>handleIngredientChange(e,idx) }/>
            ))
        }
        <button onClick={addIngredient} type="button">Add Ingredients</button>
        <label htmlFor="instructions">Instructions</label>
        <textarea id="instructions" onChange={handleChange} name="instructions" ></textarea>
        <label htmlFor="imageUrl">ImageUrl</label>
        <input type="text" name="imageUrl" id="imageUrl" onChange={handleChange} />
        <label htmlFor="cookingTime">Cooking Time (minutes) </label>
        <input  type="number" id="cookingTime"  name="cookingTime" onChange={handleChange} />
        <button type="submit" >Add recipe</button>
        </form>
    </div>
    )
}