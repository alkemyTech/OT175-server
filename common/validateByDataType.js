class ValidateByDataType {
    
  validateUrl(url) {
    const RegExp =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return RegExp.test(url);
  }

  validateString (data) {
    return typeof data === "string";
  };

  validateNumber (data) {
    return typeof data === "number";
  };
}

module.exports = new ValidateByDataType()