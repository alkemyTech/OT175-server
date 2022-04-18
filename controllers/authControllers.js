const { body, validationResult } = require('express-validator'); 
const Model = require('../models');
const { User } = Model


class AuthControllers {

    constructor(){
        this.signin,
        this.logIn
    }

    async signin(req, res, next) {
        try {
            const errors = validationResult(req);

            if ( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array() })

            const admin = await User.findAll({
                where: {
                    roleId: 1
                }
            })
            
            console.log(req.body)
            if(admin){
                await User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    image: req.body.image,
                    password: req.body.password,
                    roleId: 2,
                })

                return res.json('The user has been created')
            } else {
                await User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    image: req.body.image,
                    password: req.body.password,
                    roleId: 1,
                })

                return res.json('The user has been created')
            }
                
        } catch (error) {
            next(error)
        }
    }

    
    // async logIn(req, res, next) {
    //     try {
            
    //     } catch (error) {
    //         next(error)
    //     }
    // }

}

module.exports = new AuthControllers()