import * as factory from "./handlersFactory.js";

import Brand from "../models/brandModel.js";

// @desc Get list of brands
// @route GET /api/v1/brands
// @access Public
export const getBrands = factory.getAll(Brand);

//@desc get a specific brand by id
// @route GET /api/v1/brands/:id
// @access Public

export const getBrand = factory.getOne(Brand);

// @desc Create a new brand
// @route POST /api/v1/brands
// @access Private
export const createBrand = factory.createOne(Brand);

//@desc  update a specific brand by id
// @route PUT /api/v1/brands/:id
// @access Private
export const updateBrand = factory.updateOne(Brand);

//@desc  Delete a specific brand by id
// @route DELETE /api/v1/brands/:id
// @access Private
export const deleteBrand = factory.deleteOne(Brand);
