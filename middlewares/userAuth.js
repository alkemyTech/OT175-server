const jwt = require('jsonwebtoken');
require('dotenv').config();
const models = require('../models');
const { Role } = models


function restrictUnauthorizedRoles (authorizedRoles) {
    return async(req, res, next)=>{
        const {token} = req.headers;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if(payload.roleId)
        {
            const role = await Role.findByPk(payload.roleId)
            if (role && authorizedRoles.includes(role.name)){
                next();
            }else if(!role){
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
