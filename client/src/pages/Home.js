import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserId } from "../Components/hooks/useGetUserId.js";
import "../App.css";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserId();
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:4000/recipes");
        setRecipes(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const res = await axios.put(
        "http://localhost:4000/recipes/saveRecipeToUser",
        { recipeId: recipeID, userID: userID }
      );
      console.log(res.data);

      setSavedRecipes(res.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id.toString());

  return (
    <div className="container-home">
      <div className="heading">
        <h1>Recipes</h1>
      </div>

      <div className="recipe-container">
        {recipes.map((recipe) => (
          <div className="each-recipe" key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id) ? "Saved" : ""}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save Recipe"}
              </button>
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
};
