const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}
// Configuration
cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET
});
 
// Configure Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "RESTAURANT", // Cloudinary folder name
      allowedFormats:["png","jpg","jpeg","pdf"]
    },
  });

module.exports=storage;