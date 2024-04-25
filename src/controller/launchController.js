const Launch = require("../model/launchModel");
const asyncHandler = require("../utils/asyncHandler");
const dbService = require("../utils/dbService");
const { uploadImages, updateAndSet, deleteImages } = require("../utils/upload");

exports.getAllLaunches = asyncHandler(async (req, res) => {
  const launches = await dbService.findMany(Launch, {});
  res.success({ data: launches });
});

exports.getLaunch = asyncHandler(async (req, res) => {
  const launch = await dbService.findOne(Launch, { _id: req.params.id });
  if (!launch) {
    return res.recordNotFound("Launch");
  }
  res.success({ data: launch });
});

exports.getLatestLaunches = asyncHandler(async (req, res) => {
  const launches = await dbService.findMany(Launch, {}, { createdAt: -1 }, 8);
  res.success({ data: launches });
});

exports.getDeveloperLaunches = asyncHandler(async (req, res) => {
  const launches = await dbService.findMany(Launch, {
    developer: req.params.id,
  });
  res.success({ data: launches });
});

exports.createLaunch = asyncHandler(async (req, res) => {
  uploadImages("video", req);
  uploadImages("thumbnail", req);
  const launch = await dbService.create(Launch, req.body);
  res.success({ data: launch });
});

exports.updateLaunch = asyncHandler(async (req, res) => {
  const launch = await dbService.findOne(Launch, { _id: req.params.id });
  if (!launch) {
    return res.recordNotFound("Launch");
  }
  updateAndSet(launch, "video", req, res);
  updateAndSet(launch, "thumbnail", req, res);
  await dbService.updateOne(Launch, { _id: req.params.id }, req.body);
  res.success({ data: launch });
});

exports.deleteLaunch = asyncHandler(async (req, res) => {
  const launch = await dbService.findOne(Launch, { _id: req.params.id });
  if (!launch) {
    return res.recordNotFound("Launch");
  }
  deleteImages(launch.video);
  deleteImages(launch.thumbnail);
  await dbService.deleteOne(Launch, { _id: req.params.id });
  res.success({ message: "Launch deleted successfully" });
});
