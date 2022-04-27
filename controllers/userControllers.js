const { NOT_FOUND } = require('../common/httpCodes');
const HttpStatusCodes = require('../common/httpCodes');
const Model = require('../models');
const { User } = Model;
const { body, param, validationResult } = require('express-validator');

class UserController {
  async getUsers(req, res, next) {
    try {
      const query = await User.findAll();
      res.json(query);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const userQuery = await User.findByPk(parseInt(req.params.id));
      userQuery
        ? res.json(userQuery)
        : res.json({ msge: 'The query got no results. Im sory' });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'firstName',
      'lastName',
      'email',
      'photo',
      'password',
      'roleId',
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    try {
      const adminQuery = await User.findAll({
        where: {
          id: req.params.id,
        },
      });

      if (!isValidOperation || !adminQuery)
        return res.status(400).send({ error: 'Invalid update!' });
      else if (isValidOperation) {
        const query = await User.update(req.body, {
          where: {
            id: parseInt(req.params.id),
          },
        });

        res.json(query);
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const adminQuery = await User.findAll({
        where: {
          id: req.params.id,
        },
      });

      if (adminQuery) {
        const data = await User.destroy({
          where: {
            id: req.params.id,
          },
        });
        if (data)
          return res.json({ msge: 'The user has been successfully deleted' });
        else
          return res
            .status(404)
            .json({ msge: 'An error has occured. The user doesnt exist' });
      }
    } catch (error) {
      next(error);
    }
  }

  async patchUser(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    } else {
      let userId = req.params.id;

      try {
        let user = await User.findByPk(userId);

        if (!user) {
          throw new Error('User not found');
        }
      } catch (error) {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .send({ status: error.message });
      }

      let firstName = req.body.firstName ? req.body.firstName : user.firstname;
      let lastName = req.body.lastName ? req.body.lastName : user.lastName;
      let email = req.body.email ? req.body.email : user.email;
      let image = req.body.image ? req.body.image : user.image;
      let password = req.body.password ? req.body.password : user.password;
      let roleId = req.body.roleId ? req.body.roleId : user.roleId;

      try {
        let result = await User.update(
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            image: image,
            password: password,
            roleId: roleId,
          },
          {
            where: { id: userId },
          }
        );
      } catch (error) {
        return res
          .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
          .send({ status: error.message });
      }

      return res.send({ 'Updated records: ': result });
    }
  }
}

module.exports = new UserController();
