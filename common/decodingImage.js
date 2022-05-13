const { encode, decode } = require('node-base64-image');
const fs = require('fs');
const UploadFile = require('./fileUpload');

class DecodingImage {
  static async decoding(imageBase64) {
    const timeInMilis = Date.now();
    const folderName = `./uploadedImages/`;
    const fileName = `${timeInMilis}_${Math.floor(Math.random() * 899 + 100)}`;
    let rs;
    let json;

    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }

    try {
      await decode(imageBase64, { fname: folderName + fileName, ext: 'jpg' });
    } catch (err) {
      return err.message;
    }
    try {
      rs = fs.createReadStream(folderName + fileName + '.jpg');
    } catch (err) {
      return err.message;
    }
    try {
      json = await UploadFile.uploadFile(fileName + '.jpg', rs);
    } catch (err) {
      return err.message;
    }
    try {
      fs.unlinkSync(folderName + fileName + '.jpg');
    } catch (error) {
      console.log("no se pudo eliminar la imagen")
    }

    return json.Location;
  }
}

module.exports = DecodingImage;
