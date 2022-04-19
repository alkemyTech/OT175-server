const Model = require('../models');
const { User } = Model


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
              
                const query = await User.update( req.body, { 
                    where: {
                        id: parseInt(req.params.id)
                }})
    
                res.json(query)
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