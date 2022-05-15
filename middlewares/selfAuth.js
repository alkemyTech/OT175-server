const jwt = require('jsonwebtoken');
require('dotenv').config();

async function selfAuth(req, res, next){
    const {id} = req.params 

    if (!req.headers.authorization) return res.json({ msg: 'no token in request' });
    const token = req.headers.authorization.split(' ')[1];
    try{ 
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if(payload.id===parseInt(id)){       
            next()
        }else{
            res.status(501).send('conflict ocurred')
        };
    }catch(err){
        res.status(401).json({ msg: 'Token expired or not valid' });
    }
};
module.exports = selfAuth
