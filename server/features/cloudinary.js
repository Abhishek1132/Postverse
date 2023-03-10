const cloudinary = require("cloudinary").v2;

const cloudinaryUpload = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        folder,
        resource_type: "auto",
        eager: {
          quality: 90,
        },
        transformation: {
          quality: 90,
        },
      },
      (err, result) => {
        reject(err);
        resolve({
          imageUrl: result.url,
          imageId: result.public_id,
        });
      }
    );
  });
};

module.exports = {
  cloudinaryUpload,
};
