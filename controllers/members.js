const models = require('../models');
const { Member } = models;
const httpCodes = require('../common/httpCodes');
const handleError = require('../common/handleError');
class MemberController {
  static async getMembers(req, res) {
    try {
      const members = await Member.findAll({});

      if (!members.length)
        return res
          .status(httpCodes.NOT_FOUND)
          .json({ msg: 'There is no registered members' });

      res.status(httpCodes.OK).json(members);
    } catch (err) {
      console.log(err);
      return handleError.HTTP_ERROR_INTERNAL(err, res);
    }
  }

  static async getMemberById(req, res) {
    const { id } = req.params;
    try {
      const member = await Member.findOne({ where: { id } });

      if (!member)
        return res
          .status(httpCodes.NOT_FOUND)
          .json({ msg: 'There is no registered member' });

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
