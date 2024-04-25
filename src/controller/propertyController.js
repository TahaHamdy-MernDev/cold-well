const Property = require("../model/propertyModel");
const asyncHandler = require("../utils/asyncHandler");
const dbService = require("../utils/dbService");
const { uploadImages, updateAndSet, deleteImages } = require("../utils/upload");
exports.createProperty = asyncHandler(async (req, res) => {
  // await uploadImages("image", req);
  await uploadImages("thumbnail", req)
  const property = await dbService.create(Property, req.body);
  res.success({ data: property });
});
exports.getProperty = asyncHandler(async (req, res) => {
  const property = await dbService.findOne(Property, { _id: req.params.id });
  if (!property) {
    return res.recordNotFound("Property");
  }
  res.success({ data: property });
});
exports.updateProperty = asyncHandler(async (req, res) => {
const property = await dbService.findOne(Property, { _id: req.params.id });
  if (!property) {
    return res.recordNotFound("Property");
  }
  updateAndSet(developer, "images", req, res);
 await dbService.updateOne(
    Property,
    { _id: req.params.id },
    req.body
  );
  
  res.success({ data: property });
});
exports.deleteProperty = asyncHandler(async (req, res) => {
  const property = await dbService.findOne(Property, { _id: req.params.id });
  if (!property) {
    return res.recordNotFound("Property");
  }
  deleteImages(property.images);
  await dbService.deleteOne(Property, { _id: req.params.id });
  res.success({message:"Property deleted successfully"});
});
exports.getAllProperties = asyncHandler(async (req, res) => {
  const properties = await dbService.findMany(Property, {});
  res.success({ data: properties });
});
exports.getPropertiesForRent = asyncHandler(async (req, res) => {
  const properties = await dbService.findMany(Property, { sale: false });
  res.success({ data: properties });
});
exports.getPropertiesForSale = asyncHandler(async (req, res) => {
  const properties = await dbService.findMany(Property, { sale: true });
  res.success({ data: properties });
});
// update property images 
exports.uploadImages = asyncHandler(async (req, res) => {
  const property = await dbService.findOne(Property, { _id: req.params.id });
  if (!property) {
    return res.recordNotFound("Property");
  }
  updateAndSet(property, "image", req, res);
  res.success({ data: property });
}); 
