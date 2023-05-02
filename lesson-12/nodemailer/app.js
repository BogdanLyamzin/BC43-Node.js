const nodemailer = require("nodemailer");
require("dotenv").config();

const {META_PASSWORD, META_USER} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465, // 25, 465, 2525
    secure: true,
    auth: {
        user: META_USER,
        pass: META_PASSWORD,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
    to: "mahera1071@syinxun.com",
    from: META_USER,
    subject: "Test email",
    html: `<p>Test email</p>`
};

transport.sendMail(email)
    .then(()=> console.log("Email send success"))
    .catch(error => console.log(error.message))