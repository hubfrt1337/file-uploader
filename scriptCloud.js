require("dotenv").config();
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2


cloudinary.config({
    cloud_name: "defxrbopq",
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})


function uploadToCloudinary(buffer, mimetype) {
    return new Promise((resolve, reject) => {
        let resourceType;
        if(mimetype.startsWith("video")){
            resourceType = "video"
        } else if(mimetype.startsWith("image")){
            resourceType = "image"
        } else {
            resourceType = "raw"
        }
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: resourceType,
            },

            (error, result) => {
                if (result) { resolve(result) }
                else { reject(error) }
            }
        )
        streamifier.createReadStream(buffer).pipe(stream)
    })
}

module.exports = {
    uploadToCloudinary
};