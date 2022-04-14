const models = require('../models');
const { Member } = models;

const getMembers = async(req, res) => {
    try {
        const members = await Member.findAll({
            where: {
                'deleted': 0
            },
            attributes: ['id','name', 'facebookUrl', 'instagramUrl', 'linkedinUrl', 'image', 'description']
        });

        // Verify if exists members
        if ( !members ) {
            return res.status(400).json({msg:'There is no registered members'});
        }

        res.status(200).json({members});
    } catch (err) {
        console.log(err);
        res.status(501).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

const getMember = async(req, res) => {
    try {
        const { id } = req.params;
        const member = await Member.findOne({
            where: {
                id,
                'deleted': 0
            },
            attributes: ['id','name', 'facebookUrl', 'instagramUrl', 'linkedinUrl', 'image', 'description']
        });

        // Verify if exists members
        if ( !member ) {
            return res.status(400).json({msg:'There is no registered member'});
        }

        res.status(200).json({member});
    } catch (err) {
        console.log(err);
        res.status(501).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

module.exports = {
    getMembers,
    getMember
}