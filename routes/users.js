var express = require('express');
var router = express.Router();
const selfAuth = require('../middlewares/selfAuth')
const models = require('../models');
const { User } = models

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.delete('/:id',
  selfAuth,
  async(req, res, next)=>{
    const { id } = req.params
    User.destroy({
      where: {id:id}
    })
    .then(()=>res.status(200).send('deletion complete'))
    .catch((err)=>{
      console.error(err);
      res.status(404).send('could not delete')
    });
  }
)

module.exports = router;
