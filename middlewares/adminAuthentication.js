const jwt = require('jsonwebtoken');
const Role = require('../controllers/roleController');

module.exports =  function(req,res,next){
    const token = req.header;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if(payload.id && payload.roleId){
        try{
            const IS_ADMIN = Role.isAdmin(payload.roleId);
            if (!IS_ADMIN){
                return res.status(401).json({error: "Acces denied"});
            }
        }
        catch (err){
            return res.json(err);
        }
    }else{
        res.status(401).send('invalid credentials')
    };

    next();
}