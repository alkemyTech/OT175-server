const express = require('express');
const Testimonials = require('../controllers/testimonials')
const router = express.Router();

router.get('/:id', function(req, res, next) {
  Testimonials.get(req.params.id).then(result => {
      res.json(result);
  })
  .catch(err => {
    res.json(err);
  });
});

router.get('/', function(req, res, next) {
  Testimonials.index().then(result => {
    res.json(result)
  })
  .catch(err => {
    res.json(err);
  })
});

router.delete('/:id', function(req, res, next) {
  Testimonials.delete(req.params.id).then(result => {
    res.json(result);
  })
  .catch(err => {
    res.json(err);
  })
});

router.post('/',function(req,res,next) {
  Testimonials.post(req.body.name,req.body.image,req.body.content).then(result => {
      res.json(result);
  })
  .catch(err => {
    res.json(err);
  })
})

router.patch('/:id',function(req,res,next) {
  Testimonials.update(req.params.id,req.body.name,req.body.image,req.body.content).then(result => {
      res.json(result);
  })
  .catch(err => {
    res.json(err);
  })
})

module.exports = router;
