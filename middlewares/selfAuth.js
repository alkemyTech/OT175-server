const jwt = require('jsonwebtoken');
require('dotenv').config();

async function selfAuth(req, res, next){
    const {id} = req.params 

    const token = req.headers.authorization.split(" ");
    const payload = jwt.verify(token[1], process.env.JWT_SECRET);
    if(payload.userId===parseInt(id)){       
        next()
    }else{
        res.status(501).send('conflict ocurred')
    };
};
module.exports = selfAuth
