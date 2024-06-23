import express from "express";
import {
  getAllMealCategories,
  getMealsByCategory,
} from "../controllers/ReciepesController.js";

const router = express.Router();

router.get("/getAllMealCategories", getAllMealCategories);
router.get("/getMealsByCategory/:category", getMealsByCategory);

export default router;
