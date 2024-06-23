import mongoose from "mongoose";

const ReciepSchema = mongoose.Schema({
  idCategory: { type: Number, required: true },
  strCategory: { type: String, required: true },
  strCategoryThumb: { type: String, required: true },
  strCategoryDescription: { type: String, required: true },
});

const Recipe = mongoose.model("recipe", ReciepSchema);

export default Recipe;
