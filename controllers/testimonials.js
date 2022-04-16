const models = require('../models');
const { Testimonial }  = models;

class TestimonialController {

  post(name, image, content) {
    return Testimonial.create({
      name: name,
      image: image,
      content: content
    });
  }

  get(){
    return Testimonial.findAll();
  }

  get(id) {
    return Testimonial.findByPk(id);
  }

  update(id, name, image, content) {
    return Testimonial.update({
        name: name,
        image: image,
        content: content
    }, {
        where: {
            id: id
        }
    });
  }

  delete(id) {
    return Testimonial.destroy({
        where: {
            id: id
        }
    })
  }
}

module.exports = new TestimonialController(); 