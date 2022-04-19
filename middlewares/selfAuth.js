const jwt = require('jsonwebtoken');
require('dotenv').config();

async function selfAuth(req, res, next){
    const {id} =req.params 

    const token = req.header;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if(payload.id===id){
        next()
    }else{
        res.status(501).send('conflict ocurred')
    };
};
module.exports = selfAuth
