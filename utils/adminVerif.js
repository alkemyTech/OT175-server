const Model = require('../models');
const {User, Role} = Model
 
     exports.adminVerify = async (req, res) => {
         try {
             const adminQuery = await User.findAll({
                 where: {
                     id: req.params.id
                     // id: req.user.id
                 },
                 include: [{
                     model: Role,
                     where: { 
                         name: 'Admin' 
                     },
                 }],
             })
             
         } catch (error) {
             console.log(error)
         }
    }

    