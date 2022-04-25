const { body, validationResult } = require('express-validator'); 
const Model = require('../models');
const { User } = Model


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
}

module.exports = new AuthControllers()