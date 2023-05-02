const {BASE_URL} = process.env;

const createVerifyEmail = (verificationCode)=> {
    const verifyLink = `${BASE_URL}/api/auth/verify/${verificationCode}`;
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${verifyLink}">Click verify email</a>`
    };

    return verifyEmail;
}

module.exports = createVerifyEmail;