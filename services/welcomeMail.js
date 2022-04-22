const ejs = require('ejs');
const path = require('path');
const emailTitle = "Welcome";
const SendEmail = require('./sendEmail');

module.exports = class welcomeMail{

    static async sendWelcomeMail(email,title,text,contact){

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
    
        return(SendEmail.sendEmailTo(email,emailTitle,emailTemplate));

    }
}
