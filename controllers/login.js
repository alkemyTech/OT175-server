const { body, validationResult } = require("express-validator");
const httpStatusCodes = require("../common/httpCodes");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const models = require('../models');
const { User } = models;

class LoginController {
  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Invalid email or password");
      }
      const { email } = req.body
      let user = await User.findOne({ where: { email } });

      if (user === null) {
        throw new Error("User/email not found");
      } else {
        let passwordIsOk = bcrypt.compareSync(req.body.password, user.password);

        if (passwordIsOk) {
          const { id, roleId } = user;
          const token = jwt.sign({ id, roleId}, process.env.JWT_SECRET, { expiresIn: '8h' });
    
          res.json({token});
        } else {
          throw new Error("Invalid password");
        }
      }
    } catch (error) {
      res.status(httpStatusCodes.NOT_FOUND).send({ ok: false });
      console.log(error);
    }
  }
}
module.exports = new LoginController();
