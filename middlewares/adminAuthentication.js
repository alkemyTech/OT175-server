const User = require('../controllers/userController');
const ADMIN_ROLE_ID = 1;

module.exports =  function(req,res,next){

        if(typeof req.body.roleId !== "undefined"){
            if(req.body.roleId !== ADMIN_ROLE_ID){
                return res.status(401).json({error: "Acces denied"});
            }
        }
        else{
            return res.status(401).json({error: "Invalid request"});
        }

        next();
}