const jwt = require('jsonwebtoken');
require('dotenv').config();
const models = require('../models');
const { User } = models


function restrictUnauthorizedRoles (authorizedRoles) {
    return async(req, res, next)=>{
        const {token} = req.headers;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        let targetUser = {}
        if(payload.roleId)
        {
            const role = await Role.findByPk(payload.roleId)
            if (targetUser && authorizedRoles.includes(role.name)){
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