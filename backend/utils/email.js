const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})

const sendEmail = async (options) => {
    try{
        await transporter.sendMail({
            from: '"Phones Store" <no-reply>',
            to: options.to,
            subject: options.subject,
            html: options.html
        })
    }catch(e){
        console.log("Error:", e)
        throw e;
    }
}

module.exports = sendEmail