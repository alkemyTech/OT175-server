const sgMail = require('@sendgrid/mail');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

module.exports =class sendEmail{

    static async sendEmailTo(emailTo,emailSubject,title,text,contact, nameFile){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        let emailTemplate;
        
        try{
            emailTemplate = await ejs.renderFile(path.join(__dirname, `../views/${nameFile}`), 
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
            to: emailTo,
            from: process.env.FROM_EMAIL,
            subject: emailSubject,
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
