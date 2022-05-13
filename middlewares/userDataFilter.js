const jwt = require('jsonwebtoken');
require('dotenv').config()
const { Role } = models

function filterDataForUser(rolesAndPermits){
    return async(req, res, next)=>{
        const {data}  = res.locals

        if (!req.headers.authorization) return res.json({ msg: 'no token in request' });
        const token = req.headers.authorization.split(' ')[1];
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const role = await Role.findByPk(payload.roleId) 
            
            const restrictedFields = rolesAndPermits[role.name]
            for(blocked of restrictedFields){
                delete data[blocked]
            }
           res.status(200).json(data)
    }catch{
        res.status(401).json({ msg: 'Token expired or not valid' });
    }
    };
};

module.exports = filterDataForUser