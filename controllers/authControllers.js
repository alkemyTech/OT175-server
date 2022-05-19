const { body, validationResult } = require("express-validator");
const Model = require("../models");
const { User, Role } = Model;
const jwt = require("jsonwebtoken");
const httpStatusCodes = require("../common/httpCodes");
const bcrypt = require("bcrypt");
const welcomeMail = require("../services/welcomeMail");

const emailTitle = "Bienvenido a la ONG somos más";
const text =
  "Para nosotros es un honor tenerque con nosotros, gracias por unirte";
const contact =
  "Contactanos por los siguientes canales: Mail: somosfundacionmas@gmail.com, Instagram: SomosMás, Facebook: Somos_Más, Teléfono de contacto: 1160112988";

class AuthControllers {
  static async signin(req, res, next) {
    const title = `Bienvenido ${req.body.firstName}`
    try {
      const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        image: req.body.image,
        password: req.body.password,
        roleId: 2,
      });
      let {id, roleId} = newUser;
      const token = jwt.sign({ id, roleId }, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });
      res
        .status(200)
        .json({
          ...newUser.dataValues,
          token :token
        });
    } catch (error) {
      next(error);
    }
    try {
       welcomeMail.sendWelcomeMail(
        req.body.email,
        emailTitle,
        title,
        text,
        contact
      );
    } catch (err) {
     res.status(404).send("no se pudo enviar el mensaje");
    }
    
  }

  static async getDataUser(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const jwtDecoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      where: { id: jwtDecoded.id },
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });

    try {
      res.status(200).json(user);
    } catch (err) {
      res.json({
        msg: "There was a problem getting the user data, check with the administrator",
      });
    }
  }

  static async login(req, res, next) {
    try {
      const { email } = req.body;
      let user = await User.findOne({ where: { email } });

      if (user === null) {
        throw new Error("User/email not found");
      } else {
        let passwordIsOk = bcrypt.compareSync(req.body.password, user.password);
        console.log(passwordIsOk)
        if (passwordIsOk) {
          const { id, roleId } = user;
          const token = jwt.sign({ id, roleId }, process.env.JWT_SECRET, {
            expiresIn: "8h",
          });

          res.status(200).json( token );
        } else {
          throw new Error("Invalid password");
        }
      }
    } catch (error) {
      res.status(httpStatusCodes.NOT_FOUND).json({ ok: false });
      console.log(error);
    }
  }
}

module.exports = AuthControllers;
