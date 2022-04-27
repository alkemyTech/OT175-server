const jwt = require('jsonwebtoken');
require('dotenv').config()

function filterDataForUser(rolesAndPermits){
    return async(req, res, next)=>{
        const {data}  = res.locals

        const {token} = req.headers
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const role = payload.roleId 
        
        const restrictedFields = rolesAndPermits[role]
        for(blocked of restrictedFields){
            delete data[blocked]
        }
        res.status(200).json(data)
    };
};

module.exports = filterDataForUser
