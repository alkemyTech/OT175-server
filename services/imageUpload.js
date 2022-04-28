const handleError = require('../common/handleError')
const fs = require('fs');
const path = require('path');
const fileUpload = require('../common/fileUpload')

module.exports = class ImageUpload {
        static async uploadImage(req, res, next) {
            if(req.body.imgName){
                const dir = path.join(__dirname, `../public/assets/images/${req.body.imgName}`)
                
                let img;
                try{
                    img = fs.readFileSync(dir);
                }
                catch {
                    return res.status(404).json({ message: "Image not found" });
                }    

                try{
                    let data = await fileUpload.uploadFile(req.body.imgName,img);
                    return res.json(`File uploaded to: ${data.Location}`);
                }
                catch(err){
                    return res.json(err);
                }
            }
            else{
                return handleError.HTTP_BAD_REQUEST(res);
            }
    }
}