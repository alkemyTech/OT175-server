class DbAux {
  static composeModelRecord(body, object) {
    delete body.id;

    for (let key in object.dataValues) {
      if (body[key]) {
        object.dataValues[key] = body[key];
      }
    }
    return object;
  }
}

module.exports = DbAux;
