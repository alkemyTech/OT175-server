const AWS = require('aws-sdk');
const { response } = require('express');

exports.uploadFile = (req, res = response) => {
    
    // Initializing S3 Interface
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_PUBLIC_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    });
    const {tempFilePath, data, mimeType} = req.files.archivo;    

    // setting up s3 upload parameters
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: tempFilePath, // file name you want to save as
        Body: data,
        ContentType: mimeType 
    };

    try {
        // Uploading files to the bucket
        s3.upload(params, (err, data) => {
            if (err) {
                throw err
            }
            console.log(`File uploaded successfully. ${data.Location}`)
            res.json(data);
            console.log(data);
            return data;
        });
    } catch (error) {
        console.log(error);
        res.json({error: error})
    }
};