const Type = require("../model/typeModel");
const asyncHandler = require("../utils/asyncHandler");
const dbService = require("../utils/dbService");
const { uploadImages, updateAndSet, deleteImages } = require("../utils/upload");

exports.getAllTypes = asyncHandler(async (req, res) => {
  const types = await dbService.findMany(Type, {});
  res.success({ data: types });
});
exports.getType = asyncHandler(async (req, res) => {
  const type = await dbService.findOne(Type, { _id: req.params.id });
  if (!type) {
    return res.recordNotFound("Type");
  }
  res.success({ data: type });
});

exports.createType = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const existingType = await dbService.findOne(Type, {
    $or: [{ "name.en": name.en }, { "name.ar": name.ar }], 
  });
  if (existingType) {
    return res.conflict("name");
  }
  uploadImages("image", req);
  const type = await dbService.create(Type, req.body);
  res.success({ data: type });
});

exports.updateType = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const existingType = await dbService.findOne(Type, {
    $or: [{ "name.en": name.en }, { "name.ar": name.ar }],
    _id: { $ne: req.params.id },
  });

  if (existingType) {
    return res.conflict("name");
  }

  const type = await dbService.findOne(Type, { _id: req.params.id });
  if (!type) {
    return res.recordNotFound("Type");
  }
  updateAndSet(type, "image", req);
  await dbService.updateOne(Type, { _id: req.params.id }, req.body);

  res.success({ data: type });
});

exports.deleteType = asyncHandler(async (req, res) => {
  const type = await dbService.findOne(Type, { _id: req.params.id });
  if (!type) {
    return res.recordNotFound("Type");
  }

  await dbService.deleteOne(Type, { _id: req.params.id });
  res.success();
});
