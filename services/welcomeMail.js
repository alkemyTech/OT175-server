const sgMail = require('@sendgrid/mail');
const ejs = require('ejs');
const path = require('path');
const emailTitle = "Welcome";
module.exports = class welcomeMail{

    static async sendWelcomeMail(email,title,text,contact){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        let emailTemplate;
        
        try{
            emailTemplate = await ejs.renderFile(path.join(__dirname, "../views/emailWelcome.ejs"), 
            {
                title: title,
                text: text,
                contact: contact
            })
        }
        catch (err){
            return err;
        }
      
        const msg = {
            to: email,
            from: process.env.SENDGRID_MAIL,
            subject: emailTitle,
            html: emailTemplate
        };
    
        try {
            let res = await sgMail.send(msg);
            return(res);
        } 
        catch (err) {
            return err;
        }
    }
}
