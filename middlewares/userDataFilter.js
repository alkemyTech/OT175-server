const jwt = require('jsonwebtoken');

function filterDataForUser(rules){
//
    return async(req, res, next)=>{
        const {data}  = res.locals
        //debeíamos pasar los datos por médio de res.locals para que sean accesibles

        const token = jwt.decode(req.headers)
        //se supone que para llegar hasta este middleware el token fue previamente autenticado
        const role = token.payload.roleId 
        const restricted = rules[role]


        for(blocked of restricted){
            delete data[blocked]
        }
        res.json(data)
    };
};

module.exports = filterDataForUser