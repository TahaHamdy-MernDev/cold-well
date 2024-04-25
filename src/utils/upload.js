const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__basedir, "uploads"));
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}--${uuidv4()}--${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30MB in bytes
  },
});


async function deleteImages(imagePaths) {
  for (const filePath of imagePaths) {
    try {
      await fs.promises.unlink(path.join(__basedir, `uploads/${filePath}`));
    } catch (err) {
      console.error(`Failed to delete image at ${filePath}:`, err);
    }
  }
}
async function uploadImages(type, req) {
  
  if (req.files[type]) {
    const filenames = req.files[type].map((file) => file.filename);
    req.body[type] = filenames;
  } else {

    console.log(`No files uploaded for type: ${type}`);
  }
}
  // if (req.method !== 'PUT') {
  //   if (req.files === undefined || req.files.image === undefined) {
  //     throw new Error("No Files Selected!");
  //   } 
  // }

async function updateAndSet(doc, type, req) {
  const oldImagePaths = doc[type]; 
  await uploadImages(type, req);
  doc[type] = req.body[type]; 
  await doc.save(); 
await  deleteImages(oldImagePaths);
}
module.exports = { upload, uploadImages,updateAndSet,deleteImages };
