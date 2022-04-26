const { body, validationResult } = require('express-validator'); 
const Model = require('../models');
const { User, Role } = Model
const jwt = require('jsonwebtoken');
const httpStatusCodes = require("../common/httpCodes");
const bcrypt = require("bcrypt");

class AuthControllers {

    async signin(req, res, next) {
        try {
            const errors = validationResult(req);

            if ( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array() })

            const newUser = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                image: req.body.image,
                password: req.body.password,
                roleId: 2,
            })
            res.locals.userData = newUser;
            next()                
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async getDataUser(req, res) {
        const token = req.headers.authorization.split(" ")[1];
        const jwtDecoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ 
            where: { 'id': jwtDecoded.id },
            include: [{
                model: Role,
                as: 'role'
            }]
        });
        
        try {
            res.json( user );
        } catch (err) {
            console.log(err)
            res.json({msg: 'There was a problem getting the user data, check with the administrator'});
        }
    }

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

module.exports = new AuthControllers()