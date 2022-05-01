class ComposeModelRecord {
  composeModelRecord(body, object) {
    delete body.id;

    for (key in object) {
      if (body.key) {
        object.key = body.key;
      }
    }
  }
}

module.exports = new ComposeModelRecord();
