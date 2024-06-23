import axios from "axios";
import Meal from "../models/MealModel.js";
import mongoose from "mongoose";

export const getAllMealCategories = async (req, res) => {
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

  try {
    const response = await axios.get(url, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
    res.json(response.data.categories.slice(0, 5));
    // console.log("response", response.data);
  } catch (error) {
    console.error(`Error fetching meal categories`, error.message);
  }
};

export const getMealsByCategory = async (req, res) => {
  const category = req.params.category;
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
    res.json(response.data);
    // console.log("response", response.data);
  } catch (error) {
    console.error(
      `Error fetching meals for category: ${category}`,
      error.message
    );
    res.status(500).json({
      error: `Error fetching meals for category: ${category}`,
      message: error.message,
    });
  }
};

export const addFavouriteMeals = async (req, res) => {
  try {
    const { meal } = req.body;

    // Check if the meal already exists in favorites (optional)
    const existingFavorite = await Meal.findOne({ strMeal: meal.strMeal });
    if (existingFavorite) {
      return res
        .status(409)
        .json({ message: "Meal already exists in favorites" });
    }
    // Create a new Meal document
    const newMeal = new Meal(meal);

    // Save the new meal to the database
    await newMeal.save();

    res.status(201).json({ message: "Meal added to favorites successfully!" });
  } catch (error) {
    console.error(error);
  }
};

export const getAllFavouriteMeals = async (req, res) => {
  try {
    const favouriteMeals = await Meal.find();
    res.status(200).json(favouriteMeals);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.error(error);
  }
};

export const deleteFavouriteMeals = async (req, res) => {
  try {
    // Get the meal ID from request parameters (assuming ID based deletion)
    const mealId = req.params.id;

    // Check if the ID is valid (optional)
    if (!mongoose.Types.ObjectId.isValid(mealId)) {
      return res.status(400).json({ message: "Invalid meal ID" });
    }
    // Find the meal document by ID and remove it
    const deletedMeal = await Meal.findByIdAndDelete(mealId);

    // Check if the meal existed
    if (!deletedMeal) {
      return res.status(404).json({ message: "Meal not found in favorites" });
    }
    res
      .status(200)
      .json({ message: "Meal removed from favorites successfully!" });
  } catch (error) {
    console.error(error);
  }
};
