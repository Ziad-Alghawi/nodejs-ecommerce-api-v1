import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "SubCategory name must be unique"],
      minlength: [2, "Too short subCategory name"],
      maxlength: [32, "Too long subCategory name"],
    },

    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must belong to parent Category"],
    },
  },
  { timestamps: true },
);

// we pass the name of the model and the schema we created
export default mongoose.model("SubCategory", subCategorySchema);
