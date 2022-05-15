const jwt = require('jsonwebtoken');
require('dotenv').config();
const models = require('../models');
const { Role } = models


function restrictUnauthorizedRoles (authorizedRoles) {
    return async(req, res, next)=>{
        if (!req.headers.authorization) return res.json({ msg: 'no token in request' });
        const token = req.headers.authorization.split(' ')[1];
        try{
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
                }
            }
        }catch(err){
            res.status(401).json({ msg: 'Token expired or not valid' });
        }
    };
};

module.exports = restrictUnauthorizedRoles
