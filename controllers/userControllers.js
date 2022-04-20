const Model = require('../models');
const { User } = Model
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')

class UserController {

    async getUsers(req, res, next) {
        try {
           
                const query = await User.findAll()
                res.json(query)
            
        } catch (error) {
            next(error)
        }
    }

    async getUserById(req, res, next) {
        try {
            const userQuery = await User.findByPk(parseInt(req.params.id))
            userQuery ? res.json(userQuery) : res.json({ msge: 'The query got no results. Im sory'})
        } catch (error) {
            next(error)
        }
    }

    async getUserByMail(req, res, next) {
        try {
            console.log(req.params)
            const userQuery = await User.findOne({
                where: {
                    email: req.params.mail
                }
            })
            userQuery ? res.json(userQuery) : res.json({ msge: 'The query got no results. Im sory'})
            // res.send(req.params)
        } catch (error) {
            next(error)
        }
    }

    async updateUser(req, res, next) {

        const updates = Object.keys(req.body) 
        const allowedUpdates = ['firstName', 'lastName', 'email', 'photo', 'password', 'roleId']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        
        try {
            const adminQuery = await User.findAll({
                where: {
                    id: req.params.id
                }
            })
            
            if(!isValidOperation || !adminQuery) return res.status(400).send({ error: 'Invalid update!' })
            else if(isValidOperation ) {
              if(updates.includes('password')){
            
                const hashedPass = await bcrypt.hash(req.body.password, 8)
                req.body.password = hashedPass

                const query = await User.update( req.body, { 
                    where: {
                        id: parseInt(req.params.id)
                }})
            
            } else {
            
                const query = await User.update( req.body, { 
                    where: {
                        id: parseInt(req.params.id)
            
                }})

            }
    
            res.json('The User has successfully been updated')
            }

        } catch (error) {
            next(error)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const adminQuery = await User.findAll({
                where: {
                    id: req.params.id
                }
            })
    
            if(adminQuery) {
                const data = await User.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                if(data) return res.json({msge: 'The user has been successfully deleted'})
                else return res.status(404).json({msge: 'An error has occured. The user doesnt exist'})
                
            }
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()