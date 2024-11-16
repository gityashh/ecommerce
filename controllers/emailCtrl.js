const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

const sendEmail = asyncHandler(async (data, req, res) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    let info = await transporter.sendMail({
        from: '"Hey 👻" <abc@example.com>', // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.html, // html body
    });
});

module.exports = { sendEmail };