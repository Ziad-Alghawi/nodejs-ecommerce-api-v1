import asyncHandler from "express-async-handler";
import slugify from "slugify";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

import Brand from "../models/brandModel.js";

// @desc Get list of brands
// @route GET /api/v1/brands
// @access Public
export const getBrands = asyncHandler(async (req, res) => {
  // Build the query
  const documentsCount = await Brand.countDocuments();
  const apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .paginate(documentsCount)
    .filter()
    .search()
    .limitFields()
    .sort();

  // execute the query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const brands = await mongooseQuery;

  res.status(200).json({
    results: brands.length,
    pagination: paginationResult,
    data: brands,
  });
});

//@desc get a specific brand by id
// @route GET /api/v1/brands/:id
// @access Public
export const getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError(`No Brand for this id ${id} `, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc Create a new brand
// @route POST /api/v1/brands
// @access Private
export const createBrand = asyncHandler(async (req, res) => {
  // using destructuring is cleaner than using req.body.name
  const { name } = req.body;
  const brand = await Brand.create({
    name,
    slug: slugify(name),
  });
  res.status(201).json({ data: brand });
});

//@desc  update a specific brand by id
// @route PUT /api/v1/brands/:id
// @access Private
export const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    {
      name,
      slug: slugify(name),
    },
    { new: true },
  );

  if (!brand) {
    return next(new ApiError(`No Brand for this id ${id} `, 404));
  }
  res.status(200).json({ data: brand });
});

//@desc  Delete a specific brand by id
// @route DELETE /api/v1/brands/:id
// @access Private
export const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) {
    return next(new ApiError(`No Brand for this id ${id} `, 404));
  }
  res.status(204).send();
});
