const validateUrl = ( url ) => {
    const RegExp =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if ( RegExp ) return RegExp.test(url);
}

module.exports = validateUrl; 
