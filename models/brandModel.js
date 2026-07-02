import mongoose from "mongoose";

// 1- Create schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"],
      unique: [true, "Brand name must be unique"],
      minlength: [3, "Too short brand name"],
      maxlength: [32, "Too long brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

// set image url
const setImageUrl = (doc) => {
  if (doc.image) {
    doc.image = `${process.env.BASE_URI}/brands/${doc.image}`;
  }
}

// this works for findOne, findAll and update but not for create
brandSchema.post('init', (doc) => {
  setImageUrl(doc);
});

// // for create and update
 brandSchema.post('save', (doc) => {
  setImageUrl(doc);
 });

// 2- Create model
const BrandModel = mongoose.model("Brand", brandSchema);

export default BrandModel;
