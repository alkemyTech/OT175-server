const AWS = require('aws-sdk');

const uploadFile = async (filename = "") => {
    
        // Initializing S3 Interface
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_PUBLIC_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
        });
        // setting up s3 upload parameters
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: filename, // file name you want to save as
            Body: filename
        };
    
        try {
            return await s3.upload(params).promise();
        } catch (error) {
            return error
        }
    }

module.exports = uploadFile;
