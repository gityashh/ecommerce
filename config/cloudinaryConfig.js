const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploadImage = async (path) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      (result) => {
        resolve({
          url: result.url,
          asset_id: result.asset_id,
            public_id: result.public_id,
        });
      },
      {
        resource_type: "auto",
      }
    );
  });
};

const cloudinaryDeleteImage = async (id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      id,
      (result) => {
        resolve({
          url: result.url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        });
      },
      {
        resource_type: "auto",
      }
    );
  });
};

module.exports = { cloudinaryUploadImage, cloudinaryDeleteImage };
