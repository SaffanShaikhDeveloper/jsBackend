import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // Built in Node.js module for file system operations

//Do some configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//function to upload image to cloudinary from local file system
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detect the resource type (image, video, etc.)
    });
    //File has been uploaded successfully
    console.log("File uploaded successfully:", response.url);
    return response; // Return response
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operatin got failed
    console.error("Error uploading file to Cloudinary:", error);
    throw error; // Rethrow the error for further handling
  }
};

export { uploadOnCloudinary };

/* //function to upload image to cloudinary
cloudinary.v2.uploader
  .upload(
    "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
    {
      public_id: "shoes",
    }
  )
  .catch((error) => {
    console.log(error);
  }); */
