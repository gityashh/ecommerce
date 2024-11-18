const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploader = async (path) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(path, (result) => {
            resolve({ url: result.url, asset_id: result.asset_id, public_id: result.public_id });
        });
    });
};

module.exports = { cloudinary, uploader };