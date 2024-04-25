const Developer = require("../model/developerModel");
const asyncHandler = require("../utils/asyncHandler");
const dbService = require("../utils/dbService");
const { uploadImages, updateAndSet, deleteImages } = require("../utils/upload");

exports.getAllDevelopers = asyncHandler(async (req, res) => {
  const developers = await dbService.findMany(Developer, {});
  res.success({ data: developers });
});

exports.getDeveloper = asyncHandler(async (req, res) => {
  const developer = await dbService.findOne(Developer, { _id: req.params.id });
  if (!developer) {
    return res.recordNotFound("Developer");
  }
  res.success({ data: developer });
});

exports.createDeveloper = asyncHandler(async (req, res) => {
  if(!req.files) return  res.badRequest({message: "please select image" })
  uploadImages("logoUrl", req, res);
  console.log(req.body);
  const developer = await dbService.create(Developer, req.body);
  res.success({ data: developer });
});

exports.updateDeveloper = asyncHandler(async (req, res) => {
  const developer = await dbService.findOne(Developer, { _id: req.params.id });
  if (!developer) {
    return res.recordNotFound("Developer");
  }
  if(req.files && req.files.image.length > 0) {
    updateAndSet(developer, "logoUrl", req, res);
  }
  await dbService.updateOne(Developer, { _id: req.params.id }, req.body);
  res.success({ data: developer });
});

exports.deleteDeveloper = asyncHandler(async (req, res) => {
  const developer = await dbService.findOne(Developer, { _id: req.params.id });
  if (!developer) {
    return res.recordNotFound("Developer");
  }
  deleteImages(developer.logoUrl);
  await dbService.deleteOne(Developer, { _id: req.params.id });
  res.success({ message: "Developer deleted successfully" });
});
