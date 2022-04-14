
const getMembers = async(req, res) => {
    try {
        res.status(200).json({msg: 'Members'}) 
    } catch (err) {
        console.log(err);
        res.status(501).json({msg:'There was a problem getting the members, check with the administrator'})
    }
}

module.exports = {
    getMembers
}