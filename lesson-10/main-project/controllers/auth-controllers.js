const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
// const fs = require("fs/promises");
const path = require("path");

const { User } = require("../models/user");

const { ctrlWrapper } = require("../utils");

const { HttpError, createToken, renameUploadFile } = require("../helpers");

const avatarsDir = path.resolve("public", "avatars");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

    const token = createToken(newUser);
    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({
        token,
        user: {
            name: newUser.name,
            email: newUser.email,
        }
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid");
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
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
}