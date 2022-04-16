const jwt = require('jsonwebtoken');
require('dotenv').config();  // despues de que se agregue el secret a config.js esto hay que cambiarlo
const models = require('../models');
const { Users } = models


async function authMiddleware (authorizedRoles) {
//una vez se le pasen los roles permitidos retornará la funcion del middleware en sí
    return (req, res, next)=>{
        const token = req.header;
        const payload = jwt.verify(token, process.env.JWT_SECRET);//variable de .env abierta a cambios de
        if(payload.id && payload.roleId)                          //nommbre según decida el encargado de los jwt
        {
            //se busaca que el Usuario exista y que su rol coincida
            const targetUser = await Users.findOne({
                where:{
                    id: payload.user,
                    roleId: payload.role
                }
            });
            if (targetUser && authorizedRoles.includes(targetUser.roleId)){
                //si cumple todos los campos, se continúa 
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

module.exports = authMiddleware