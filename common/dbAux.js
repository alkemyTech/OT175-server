class DbAux {
  composeModelRecord(body, object) {
    delete body.id;

    for (let key in object.dataValues) {
      console.log(key);
      console.log('valor en body', body[key]);
      console.log('valor en objeto antes', object[key]);

      if (body[key]) {
        object.dataValues[key] = body[key];
      }

      console.log('valor en objeto después', object[key]);
      console.log('______________________________ ');
    }
    return object;
  }
}

module.exports = new DbAux();
