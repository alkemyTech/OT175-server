const jwt = require('jsonwebtoken');

function filterDataForUser(rules){
//rules bebería ser un objeto con roles y sus respectivos campos restingidos en un array.
    return async(req, res, next)=>{
        const {data}  = res.locals
        //debeíamos pasar los datos por médio de res.locals para que sean accesibles

        const token = jwt.decode(req.headers)
        //se supone que para llegar hasta este middleware el token fue previamente autenticado
        const role = token.payload.roleId 
        const restricted = rules[role]
        //se usa el array de restricciones acorde con la key(de rules) que coincida
        for(blocked of restricted){
            delete data[blocked]
        }
        res.json(data)
    };
};

module.exports = filterDataForUser
