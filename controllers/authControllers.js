const { body, validationResult } = require('express-validator'); 
const Model = require('../models');
const {User, Role} = Model



exports.signin = async (req, res, next) => {
    try {
       
              const errors = validationResult(req);

              if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
              }

              const admin = await User.findAll({
               where: {
                   roleId: 1
               }
            })
        //   console.log(admin)

          if(admin){
             await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                photo: req.body.photo,
                password: req.body.password,
                roleId: 2,
              })
              return res.json('The user has been created')
          }
          else {
             await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                photo: req.body.photo,
                password: req.body.password,
                roleId: 1,
              })
              return res.json('The user has been created')
          }
              

            //   res.status(404).json({msge: 'An error has occured. The user couldnt been created'})
            
          
    } catch (error) {
        next(error)
    }
}

exports.logIn = async (req, res, next) => {
    try {
        sign
    } catch (error) {
        next(error)
    }
}