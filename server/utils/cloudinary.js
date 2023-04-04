const cloudinary = require("cloudinary").v2;

const cloudinaryUpload = (file, folder, public_id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        public_id: public_id ? public_id : undefined,
        folder,
        resource_type: "auto",
        eager: {
          quality: public_id ? 50 : 75,
        },
        transformation: {
          quality: public_id ? 50 : 75,
        },
      },
      (err, result) => {
        if (err) {
          reject(err);
        }
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
