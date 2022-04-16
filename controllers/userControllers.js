const Model = require('../models');
const {User, Role} = Model
// const adminQuery = require('../utils/adminVerif')

exports.getUsers = async (req, res, next) => {
    try {
        const query = await User.findAll()
        res.json(query)
    } catch (error) {
        next(error)
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        
        const userQuery = await User.findByPk(parseInt(req.params.id))
        // console.log(userQuery)
        userQuery ? res.json(userQuery) : res.json({ msge: 'The query got no results. Im sory'})
    } catch (error) {
        next(error)
    }
}


exports.updateUser = async (req, res, next) => {

    const updates = Object.keys(req.body) 
    const allowedUpdates = ['firstName', 'lastName', 'email', 'photo', 'password', 'roleId']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    try {
        const adminQuery = await User.findAll({
            where: {
                id: req.params.id
                // id: req.user.id
            }
        })
        
        // console.log(adminQuery)
        // console.log(adminQuery.roleId)
        if(!isValidOperation || !adminQuery) return res.status(400).send({ error: 'Invalid update!' })
        else if(isValidOperation ) {
            // console.log(req.body)
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

exports.deleteUser = async (req, res, next) => {
    try {
        const adminQuery = await User.findAll({
            where: {
                id: req.params.id
                // id: req.user.id
            }
        })

        if(adminQuery) {
            const data = await User.destroy({
                where: {
                    id: req.params.id
                }
            })
            // console.log(data)
            if(data) return res.json({msge: 'The user has been successfully deleted'})
            else return res.status(404).json({msge: 'An error has occured. The user doesnt exist'})
            
        }
        
    } catch (error) {
        next(error)
    }
}


