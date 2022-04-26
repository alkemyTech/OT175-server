const AWS = require("aws-sdk");

class UploadFile {
  
    uploadFile = async (filename = "", file) => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_PUBLIC_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: filename, // file name you want to save as
      Body: file,
    };

    try {
      return await s3.upload(params).promise();
    } catch (error) {
      return error;
    }
  };
}

module.exports = new UploadFile();
