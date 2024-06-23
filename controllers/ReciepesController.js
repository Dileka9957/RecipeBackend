import axios from "axios";
import Recipe from "../models/RecipesModel.js";

export const getAllMealCategories = async (req, res) => {
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

  try {
    const response = await axios.get(url);
    res.json(response.data.categories.slice(0, 5));
    // console.log("response", response.data);
  } catch (error) {
    console.error(`Error fetching meal categories`, error.message);
    // res.status(500).json({
    //   error: `Error fetching meal categories`,
    //   message: error.message,
    // });
  }
};

export const getMealsByCategory = async (req, res) => {
  const category = req.params.category;
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

  try {
    const response = await axios.get(url);
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
