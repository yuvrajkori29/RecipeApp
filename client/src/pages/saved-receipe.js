import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useGetUserId } from "../Components/hooks/useGetUserId.js";

export const SavedReceipe = () => {
  const [savedrecipes, setSavedRecipes] = useState([]);
  
  const userID = useGetUserId();

  useEffect(() => {
    
    const fetchSavedRecipes = async ()=>{
        try {
           const res =  await axios.get(`http://localhost:4000/recipes/savedRecipes/${userID}`);
           setSavedRecipes(res.data);
           console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      
        }



    fetchSavedRecipes();
  }, [userID]);

  
 
  

  

    return (
      <div className="container-home">
      <div className="heading">
        <h1>Saved Recipes</h1>
      </div>

      <div className="recipe-container">
        {savedrecipes.map((recipe) => (
          <div className="each-recipe" key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            
            </div>
            <div>
              <p>{recipe.instructions}</p>
            </div>
            <div>
              <img
                className="recipe-image"
                src={recipe.imageUrl}
                alt={recipe.name}
              />
            </div>
            <div>
              <p>Cooking Time: {recipe.cookingTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
