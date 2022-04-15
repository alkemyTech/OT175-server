const models = require("../models");
const { Category } = models;

class CategoryController {
  create(req, res) {
    const { name, description, image } = req.body;
    if (name && description && image) {
      return Category.findOrCreate({
        where: { name: name },
        default: { name: name, description: description, image: image },
      })
        .then(category => res.status(201).send(category))
        .catch(err => res.status(400).send(err.message));
    } else {
      res.status(200).send("add a name, a description and an image");
    }
  }
  list(id) {}
  find(id) {}
  remove(id) {}
  update() {}
}
module.exports = new CategoryController();
