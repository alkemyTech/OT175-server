const models = require('../models');
const { Member } = models;
const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('http-status-codes');

const getMembers = async(req, res) => {
    const members = await Member.findAll({
        where: {
            'deleted': 0
        },
        attributes: ['id','name', 'facebookUrl', 'instagramUrl', 'linkedinUrl', 'image', 'description']
    });

        // Verify if exists members
        if ( !members.length ) {
            return res.status(NOT_FOUND).json({msg:'There is no registered members'});
        }
        
        try {
            res.status(OK).json(members);
    } catch (err) {
        console.log(err);
        res.status(INTERNAL_SERVER_ERROR).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

const getMember = async(req, res) => {
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
            return res.status(NOT_FOUND).json({msg:'There is no registered member'});
        }
        
        try {
            res.status(OK).json({member});
    } catch (err) {
        console.log(err);
        res.status(INTERNAL_SERVER_ERROR).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

const updateMember = async(req, res) => {
    const { id } = req.params;
    const { name, facebookUrl, instagramUrl, linkedinUrl, image, description } = req.body;

        const member = await Member.findOne({ where: { id, 'deleted': 0 } });
        
        // Verify if exists members
        if ( !member ) {
            return res.status(NOT_FOUND).json({msg:'There is no registered member'});
        }
        
        try {
            // Update data
            member.update({
                name,
                facebookUrl,
                instagramUrl,
                linkedinUrl,
                image,
                description
            });

            res.status(OK).json({msg: 'Member updated'});
    } catch (err) {
        console.log(err);
        res.status(INTERNAL_SERVER_ERROR).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

const deleteMember = async(req, res) => {
    const { id } = req.params;
    
    const member = await Member.findOne({ where: { id, 'deleted': 0 } });
    
    // Verify if exists members
    if ( !member ) {
        return res.status(NOT_FOUND).json({msg:'There is no registered member'});
    }
    
    try {
         // Update data
         member.update({
             'deleted': 1
         });

         res.status(OK).json({msg: 'Member deleted'});
    } catch (err) {
        console.log(err);
        res.status(INTERNAL_SERVER_ERROR).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

const postMember = async(req, res) => {
    const { name, facebookUrl, instagramUrl, linkedinUrl, image, description } = req.body;
    await Member.create({
        name,
        facebookUrl,
            instagramUrl,
            linkedinUrl,
            image,
            description 
        });
        
        try {
            res.status(OK).json({msg:'Member created'});
    } catch (err) {
        console.log(err);
        res.status(INTERNAL_SERVER_ERROR).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}


module.exports = {
    getMembers,
    getMember,
    updateMember,
    deleteMember,
    postMember,
}