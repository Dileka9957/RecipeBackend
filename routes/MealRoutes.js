import express from "express";
import {
  addFavouriteMeals,
  deleteFavouriteMeals,
  getAllFavouriteMeals,
  getAllMealCategories,
  getMealsByCategory,
} from "../controllers/MealController.js";

const router = express.Router();

router.get("/getAllMealCategories", getAllMealCategories);
router.get("/getMealsByCategory/:category", getMealsByCategory);
router.get("/getAllFavouriteMeals", getAllFavouriteMeals);
router.post("/addFavouriteMeals", addFavouriteMeals);
router.delete("/deleteFavouriteMeals/:id", deleteFavouriteMeals);

export default router;
