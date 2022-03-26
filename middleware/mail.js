const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = (email,name) => {
    const msg ={
        to:email,
        from:'noreplay.jobfinder@gmail.com',
        templateId:'d-957eeace014a4860a72d2e386721790b',
    }
    sgMail.send(msg,function(err,result){
        if(err){
            console.log('Email Not Send Error Occured');
        }else{
            console.log("Email was Sent");
        }
    })
};

module.exports = sendEmail;