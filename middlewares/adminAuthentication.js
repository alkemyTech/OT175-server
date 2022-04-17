const ADMIN_ROLE_ID = 1;

module.exports =  function(req,res,next){
        if(req.body.roleId){
            if(req.body.roleId !== ADMIN_ROLE_ID){
                res.status(401).json({error: "Acces denied"});
                return;
            }
        }
        else{
            res.status(401).json({error: "Invalid request"});
            return;
        }
        next();
}