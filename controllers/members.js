const models = require('../models');
const { Member } = models;
const httpCodes = require('../common/httpCodes');
const handleError = require('../common/handleError');
class MemberController {

  static async getMembers(req, res) {
    let page = Number.parseInt(req.query.page);
    let members;
    if(!page)
      page = 1
    try {
      members = await Member.findAll({
        limit: 10,
        offset: 10*(page-1)
      });
    } catch (err) {
      return handleError.HTTP_ERROR_INTERNAL(err, res);
    }
    if (!members.length)
      return res
        .status(httpCodes.NOT_FOUND)
        .json({ msg: 'There is no members to show' });

    const response = {
      members: members
    }

    if (members.length === 10){
      let nextMember; 
      try {
        nextMember = await Member.findAll({
          limit: 1,
          offset: 10*page
        })
      } catch (err) {
        return handleError.HTTP_ERROR_INTERNAL(err, res);
      }
      if(nextMember.length > 0)
        response.nextPage = `${process.env.BASE_PATH}/members?page=${page+1}`
    }

    if(page > 1){
      response.previousPage = `${process.env.BASE_PATH}/members?page=${page-1}`
    }

    res.status(httpCodes.OK).json(response);
    
  }

  static async getMemberById(req, res) {
    const { id } = req.params;
    try {
      const member = await Member.findOne({ where: { id } });

      if (!member)
        return res
          .status(httpCodes.NOT_FOUND)
          .json({ msg: 'There are no registered member' });

      res.status(httpCodes.OK).json({ member });
    } catch (err) {
      console.log(err);
      return handleError.HTTP_ERROR_INTERNAL(err, res);
    }
  }

  static async updateMemberById(req, res) {
    const { id } = req.params;
    const { name, facebookUrl, instagramUrl, linkedinUrl, image, description } =
      req.body;

    try {
      const member = await Member.findOne({ where: { id } });

      if (!member)
        return res
          .status(httpCodes.NOT_FOUND)
          .json({ msg: 'There is no registered member' });

      member.update({
        name,
        facebookUrl,
        instagramUrl,
        linkedinUrl,
        image,
        description,
      });

      res.status(httpCodes.OK).json({ msg: 'Member updated' });
    } catch (err) {
      console.log(err);
      return handleError.HTTP_ERROR_INTERNAL(err, res);
    }
  }

  static async deleteMemberById(req, res) {
    const { id } = req.params;
    const member = await Member.findByPk(id);

    if (!member)
      return res
        .status(httpCodes.NOT_FOUND)
        .json({ msg: 'the member you are trying to register does not exist' });

    try {
      member.destroy({ where: { id } });
      res.status(httpCodes.OK).json({ msg: 'Member deleted' });
    } catch (err) {
      return handleError.HTTP_ERROR_INTERNAL(err, res);
    }
  }

  static async postMember(req, res) {
    const { name, facebookUrl, instagramUrl, linkedinUrl, image, description } =
      req.body;
    try {
      await Member.create({
        name,
        facebookUrl,
        instagramUrl,
        linkedinUrl,
        image,
        description,
      });

      res.status(httpCodes.OK).json({ msg: 'Member created' });
    } catch (err) {
      console.log(err);
      return handleError.HTTP_ERROR_INTERNAL(err, res);
    }
  }
}

module.exports = MemberController;
