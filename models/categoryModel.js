import mongoose from "mongoose";

// 1- Create schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: [true, "Category name must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
    },
    // slug used for url friendly version of the name
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  // add createdAt and updatedAt fields to the schema
  { timestamps: true },
);

// set image url
const setImageUrl = (doc) => {
  if (doc.image) {
    doc.image = `${process.env.BASE_URI}/categories/${doc.image}`;
  }
}

// this works for findOne, findAll and update but not for create
categorySchema.post('init', (doc) => {
  setImageUrl(doc);
});

// // for create and update
 categorySchema.post('save', (doc) => {
  setImageUrl(doc);
 });

// 2- Create model
const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
