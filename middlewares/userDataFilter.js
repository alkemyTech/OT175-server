const jwt = require('jsonwebtoken');

function filterDataForUser(rolesAndPermits){
    return async(req, res, next)=>{
        const {data}  = res.locals

        const token = jwt.decode(req.headers)
        const role = token.payload.roleId 
        
        const restrictedFields = rolesAndPermits[role]

        for(blocked of restrictedFields){
            delete data[blocked]
        }
        res.json(data)
    };
};

module.exports = filterDataForUser
