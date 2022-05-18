const { NOT_FOUND } = require('../common/httpCodes');
const HttpStatusCodes = require('../common/httpCodes');
const Model = require('../models');
const { User } = Model;
const { body, param, validationResult } = require('express-validator');
const dbAux = require('../common/dbAux');

const bcrypt = require('bcrypt');

class UserController {
  static async getUsers(req, res, next) {
    try {
      const query = await User.findAll();
      res.status(200).json(query);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const userQuery = await User.findByPk(parseInt(req.params.id));
      userQuery
        ? res.status(200).json(userQuery)
        : res.status(404).json({ msge: 'The query got no results. Im sory' });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
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
        return res.status(400).json({ error: 'Invalid update!' });
      else if (isValidOperation) {
        const query = await User.update(req.body, {
          where: {
            id: parseInt(req.params.id),
          },
        });

        res.status(200).json(query);
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const adminQuery = await User.findAll({
        where: {
          id: req.params.id,
        },
      });

      if (adminQuery) {
        try{
          const data = await User.destroy({
            where: {
              id: req.params.id,
            },
          });
          res.status(200)
          .json({ msge: 'The user has been successfully deleted' });
        }catch(err)
        {
          res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
          .json(err)
        };
      }else
        res.status(404)
          .json({ msge: 'An error has occured. The user doesnt exist' });
    } catch (error) {
      next(error);
    }
  }

  static async patchUser(req, res, next) {
    var user, result;

    let userId = req.params.id;

    try {
      user = await User.findByPk(userId);

      if (!user) {
        throw new Error('User not found');
      }
    } catch (error) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ status: error.message });
    }

    let body = req.body;
    user = dbAux.composeModelRecord(body, user);

    let hashedPass = await bcrypt.hash(user.password, 8);

    user.password = hashedPass;

    try {
      result = await User.update(
        user.dataValues,

        {
          where: { id: userId },
        }
      );
    } catch (error) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: error.message });
    }

    return res.status(200).json(result);
  }
}

module.exports = UserController;
