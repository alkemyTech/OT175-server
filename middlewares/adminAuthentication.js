const jwt = require('jsonwebtoken');
const models = require('../models');
const { Role } = models;

module.exports = async function (req, res, next) {  
  if (!req.headers.authorization) return res.json({ msg: 'no token in request' });
  const token = req.headers.authorization.split(' ')[1];

  try {
    const { roleId } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Role.findOne({ where: { id: roleId } });

    const { name } = user;

    if (name !== 'Admin') return res.json({ msg: 'Access denied' });

    next();
  } catch (err) {
    res.json({ msg: 'Token expired or not valid' });
    console.log(err);
  }
};
