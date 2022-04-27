const sgMail = require("@sendgrid/mail");
require("dotenv").config();

class SendEmail {
  static async sendEmailTo(emailTo, emailSubject, emailTemplate) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: emailTo,
      from: process.env.FROM_EMAIL,
      subject: emailSubject,
      html: emailTemplate,
    };

    try {
      let res = await sgMail.send(msg);
      return res;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SendEmail;