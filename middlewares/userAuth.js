const jwt = require('jsonwebtoken');
require('dotenv').config();
const models = require('../models');
const { User } = models


function restrictUnauthorizedRoles (authorizedRoles) {
    return async(req, res, next)=>{
        let token
        if(req.headers.authorization) token = req.headers.authorization.split("Bearer ");
        else return res.status(401).send('Please log in')

        const payload = jwt.verify(token[1], process.env.JWT_SECRET);
        let targetUser = {}
        if(payload.id && payload.roleId)
        {
            targetUser = await User.findOne({
                where:{
                    id: payload.id,
                    roleId: payload.roleId
                }
            });
            if (targetUser && authorizedRoles.includes(targetUser.roleId)){
                next();
            }else if(!targetUser){
                res.status(401).send('invalid credentials')
            }
            else{
                res.status(403).send('unauthorized')
            };
        }else{
            res.status(401).send('invalid credentials')
        };
    };
};

module.exports = restrictUnauthorizedRoles