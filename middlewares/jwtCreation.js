const jwt = require('jsonwebtoken');

require('dotenv').config();

async function createJwt(req, res, next){
    const { userData } = res.locals;
    const payload = {
        userId: userData.id,
        roleId: userData.roleId
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    console.log( userData);
    res.json({
        ...userData.dataValues,
        token :token
    });
};
module.exports=createJwt