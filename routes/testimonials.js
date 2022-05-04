const express = require('express');
const Testimonials = require('../controllers/testimonials');
const router = express.Router();
const isAdminRole = require('../middlewares/adminAuthentication');
const { body, param, validationResult } = require('express-validator');

const { fieldsValidate } = require('../middlewares/fieldsValidate');

router.get('/:id', function (req, res, next) {
  Testimonials.get(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/', function (req, res, next) {
  Testimonials.index()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete('/:id', [isAdminRole], function (req, res, next) {
  Testimonials.delete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post(
  '/',
  [
    isAdminRole,
    body('name', 'name must exist and be minimum 1 character length').isLength({
      min: 1,
    }),

    body(
      'content',
      'content must exist and be minimum 1 character length'
    ).isLength({
      min: 1,
    }),

    fieldsValidate,
  ],
  function (req, res, next) {
    Testimonials.post(req.body.name, req.body.image, req.body.content)
      .then((result) => {
        res.json({ 'Records added ': result });
      })
      .catch((error) => {
        res.json({ Error: error.message });
      });
  }
);

router.patch('/:id', function (req, res, next) {
  Testimonials.update(
    req.params.id,
    req.body.name,
    req.body.image,
    req.body.content
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
