const models = require('../models');
const { Testimonial } = models;

class TestimonialController {
  static post(name, image, content) {
    return Testimonial.create({
      name: name,
      image: image,
      content: content
    });
  }

  static index() {
    return Testimonial.findAll();
  }

  get(id) {
    return Testimonial.findByPk(id);
  }

  static update(id, name, image, content) {
    return Testimonial.update(
      {
        name: name,
        image: image,
        content: content
      },
      {
        where: {
          id: id
        }
      }
    );
  }

  static delete(id) {
    return Testimonial.destroy({
      where: {
        id: id
      }
    });
  }
}

module.exports = TestimonialController;
