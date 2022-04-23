const { body, validationResult } = require('express-validator'); 
const Model = require('../models');
const { User, Role } = Model
const jwt = require('jsonwebtoken');


class AuthControllers {

    async signin(req, res, next) {
        try {
            const errors = validationResult(req);

            if ( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array() })

            await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                image: req.body.image,
                password: req.body.password,
                roleId: 2,
            })
            return res.json('The user has been created')                
        } catch (error) {
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

        res.json( user );
    }
}

module.exports = new AuthControllers()