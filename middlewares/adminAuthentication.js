const jwt = require('jsonwebtoken');
const models = require('../models');
const { Role } = models;

module.exports =  async function(req,res,next){
    const { token } = req.headers;
    if ( !token) return res.json({msg: 'no token in request'});

    try {
        
        const { roleId } = jwt.verify(token, process.env.JWT_SECRET);

        const user = await Role.findOne({ where: { 'id': roleId }});

        const { name } = user;

        if ( name !== 'Admin' ) return res.json({msg: 'Access denied'});

        next();

    } catch ( err ) {
        res.json({msg: 'Token expired or not valid'});
        console.log(err);
    }
}