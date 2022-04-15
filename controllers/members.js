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
        if ( members.length === 0 ) {
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

const updateMember = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, facebookUrl, instagramUrl, linkedinUrl, image, description } = req.body;

        const member = await Member.findOne({ where: { id, 'deleted': 0 } });

        // Verify if exists members
        if ( !member ) {
            return res.status(400).json({msg:'There is no registered member'});
        }

        // Update data
        member.update({
            name,
            facebookUrl,
            instagramUrl,
            linkedinUrl,
            image,
            description
        });

        res.status(200).json({msg: 'Member updated'});
    } catch (err) {
        console.log(err);
        res.status(501).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

const deleteMember = async(req, res) => {
    try {
        const { id } = req.params;

        const member = await Member.findOne({ where: { id, 'deleted': 0 } });

        // Verify if exists members
        if ( !member ) {
            return res.status(400).json({msg:'There is no registered member'});
        }

        // Update data
        member.update({
            'deleted': 1
        });

        res.status(200).json({msg: 'Member deleted'});
    } catch (err) {
        console.log(err);
        res.status(501).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

const getMembersDeleted = async(req, res) => {
    try {
        const members = await Member.findAll({
            where: {
                'deleted': 1
            },
            attributes: ['id','name', 'facebookUrl', 'instagramUrl', 'linkedinUrl', 'image', 'description']
        });

        // Verify if exists members
        if ( members.length === 0 ) {
            return res.status(400).json({msg:'no members removed'});
        }

        res.status(200).json({members});
    } catch (err) {
        console.log(err);
        res.status(501).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

const putMembersDeleted = async(req, res) => {

    try {
        const { id } = req.params;

        const member = await Member.findOne({ where: { id, 'deleted': 1 } });

        // Verify if exists members
        if ( !member ) {
            return res.status(400).json({msg:'there is no deleted member with that ID'});
        }

        // Update data
        member.update({
            'deleted': 0
        });

        res.status(200).json({msg: 'Member restored'});
    } catch (err) {
        console.log(err);
        res.status(501).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

const deleteMembersDeleted = async(req,res) => {
    try {
        const { id } = req.params;

        const member = await Member.findOne({ where: { id, 'deleted': 1 } });

        // Verify if exists members
        if ( !member ) {
            return res.status(400).json({msg:'there is no deleted member with that ID'});
        }

        // Delete member
        member.destroy();

        res.status(200).json({msg: 'Member deleted'});
    } catch (err) {
        console.log(err);
        res.status(501).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

const postMember = async(req, res) => {
    try {
        const { name, facebookUrl, instagramUrl, linkedinUrl, image, description } = req.body;
        await Member.create({
            name,
            facebookUrl,
            instagramUrl,
            linkedinUrl,
            image,
            description 
        });

        res.status(200).json({msg: 'Member created'});
    } catch (err) {
        console.log(err);
        res.status(501).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

module.exports = {
    getMembers,
    getMember,
    updateMember,
    deleteMember,
    getMembersDeleted,
    putMembersDeleted,
    deleteMembersDeleted,
    postMember
}