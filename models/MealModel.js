import mongoose from "mongoose";

const MealSchema = mongoose.Schema({
  strMeal: { type: String, required: true },
  strMealThumb: { type: String },
});

const Meal = mongoose.model("meal", MealSchema);

export default Meal;
