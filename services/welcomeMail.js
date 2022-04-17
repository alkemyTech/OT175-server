const sgMail = require('@sendgrid/mail');

module.exports = async function(email,title,body){
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: email,
        from: process.env.SENDGRID_MAIL,
        subject: title,
        text: body
    };
    try {
        let res = await sgMail.send(msg);
        return(res);
    } 
    catch (err) {
        return err;
    }
}


