const jwt = require('jsonwebtoken');
require('dotenv').config();
const models = require('../models');
const { Users } = models


function restrictUnauthorizedRoles (authorizedRoles) {
    return async(req, res, next)=>{
        const token = req.header;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if(payload.id && payload.roleId)
        {
            const targetUser = await Users.findOne({
                where:{
                    id: payload.user,
                    roleId: payload.role
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