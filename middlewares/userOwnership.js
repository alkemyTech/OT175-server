const Model = require('../models');
const { User, Role } = Model
const jwt = require('jsonwebtoken')

const userOwnership = (userId) => {
    return async (req, res, next) => {
    
        let tokenUser
        
        if(!req.headers.authorization) return res.status(404).send('Please log in')
        else {
            
            const token = req.headers.authorization.split(" ")[1];
            const jwtDecoded = jwt.verify(token, process.env.JWT_SECRET);
            
            try {
                    tokenUser = await User.findOne({ 
                    where: { 'id': parseInt(jwtDecoded.id) },
                    include: [{
                        model: Role,
                        as: 'role'
                    }]
                });
            }
            catch (error) { return res.status(404).send(error) }
            
            if(userId === tokenUser.id || tokenUser.roleId === 1) next()
            else return res.status(403).send('Invalid Credentials')
        }
    }
}

module.exports = userOwnership