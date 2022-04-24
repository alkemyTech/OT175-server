const jwt = require('jsonwebtoken');
require('dotenv').config()

function filterDataForUser(rolesAndPermits){
    return async(req, res, next)=>{
        const {data}  = res.locals

        const token = req.headers.authorization.split("Bearer ");
        const payload = jwt.verify(token[1], process.env.JWT_SECRET);
        const role = payload.roleId 
        
        const restrictedFields = rolesAndPermits[role]
        console.log(restrictedFields)
        for(blocked of restrictedFields){
            delete data[blocked]
        }
        console.log(data)
        res.status(200).json(data)
    };
};

module.exports = filterDataForUser