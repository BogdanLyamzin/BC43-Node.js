const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
// const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const { User } = require("../models/user");

const { ctrlWrapper } = require("../utils");

const { HttpError, createToken, renameUploadFile, sendEmail, createVerifyEmail } = require("../helpers");

const avatarsDir = path.resolve("public", "avatars");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationCode = nanoid();

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationCode });

    const verifyEmail = createVerifyEmail(verificationCode);

    await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
            name: newUser.name,
            email: newUser.email,
        }
    })
}

const verify = async(req, res)=> {
    const {verificationCode} = req.params;
    const user = await User.findOne({verificationCode});
    if(!user) {
        throw new Error(401)
    }

    await User.findByIdAndUpdate(user._id, {verify: true, verificationCode: ""});
    // res.redirect(`/verify?verify=true`);
    res.json({
        message: "Email verify success"
    });
}

const resendVerifyEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw new Error(401)
    }

    if(user.verify){
        throw new Error("Email already verify");
    }

    const verifyEmail = createVerifyEmail(user.verificationCode);

    await sendEmail(verifyEmail);

    res.json({
        message: "Email resend success"
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }

    if(!user.verify) {
        throw HttpError(401, "Email not verify");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const token = createToken(user);
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: {
            name: user.name,
            email: user.email,
        }
    })
}

const getCurrent = async (req, res) => {
    const { name, email, token } = req.user;

    res.json({
        token,
        user: {
            name,
            email,
        }
    })
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
        message: "Logout success"
    })
}

const updateAvatar = async(req, res)=> {
    const {file} = req;
    console.log(file);
    await renameUploadFile(file, avatarsDir);
    // const {path: tempUpload, filename} = req.file;
    // const resultUpload = path.join(avatarsDir, filename);
    // await fs.rename(tempUpload, resultUpload);
    const {_id} = req.user;
    const avatarURL = path.join("avatars", file.filename);
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL,
    })
}

module.exports = {
    register: ctrlWrapper(register),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
}