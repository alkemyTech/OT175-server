const models = require('../models');
const { Member } = models;

const getMembers = async(req, res) => {
    const members = await Member.findAll({
        where: {
            'deleted': 0
        },
        attributes: ['id','name', 'facebookUrl', 'instagramUrl', 'linkedinUrl', 'image', 'description']
    });

        // Verify if exists members
        if ( !members.length ) {
            return res.status(400).json({msg:'There is no registered members'});
        }
        
        try {
            res.render('members/index.ejs', {members});
    } catch (err) {
        console.log(err);
        res.status(501).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

const getMember = async(req, res) => {
    const { id } = req.params;
    const results = await Member.findOne({
            where: {
                id,
                'deleted': 0
            },
            attributes: ['id','name', 'facebookUrl', 'instagramUrl', 'linkedinUrl', 'image', 'description']
        });

        // Verify if exists members
        if ( !results ) {
            return res.status(400).json({msg:'There is no registered member'});
        }
        
        try {
            res.render('members/edit',{ member: results.dataValues });
    } catch (err) {
        console.log(err);
        res.status(501).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

const updateMember = async(req, res) => {
    const { id } = req.params;
    const { name, facebookUrl, instagramUrl, linkedinUrl, image, description } = req.body;

        const member = await Member.findOne({ where: { id, 'deleted': 0 } });
        
        // Verify if exists members
        if ( !member ) {
            return res.status(400).json({msg:'There is no registered member'});
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
            res.redirect('/members');
    } catch (err) {
        console.log(err);
        res.status(501).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

const deleteMember = async(req, res) => {
    const { id } = req.params;
    
    const member = await Member.findOne({ where: { id, 'deleted': 0 } });
    
    // Verify if exists members
    if ( !member ) {
        return res.status(400).json({msg:'There is no registered member'});
    }
    
    try {
         // Update data
         member.update({
             'deleted': 1
         });

         res.redirect('/members');
    } catch (err) {
        console.log(err);
        res.status(501).json({msg:'There was a problem getting the members, check with the administrator'})
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
            res.redirect('/members');
    } catch (err) {
        console.log(err);
        res.status(501).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

const createForm = (req, res) => {
    res.render('members/create');
}

module.exports = {
    getMembers,
    getMember,
    updateMember,
    deleteMember,
    postMember,
    createForm,
}