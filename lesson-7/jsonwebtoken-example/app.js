const jwt = require("jsonwebtoken");
require("dotenv").config();

const {SECRET_KEY} = process.env;

const payload = {
    id: "643eb6f801e52ac32eb20587"
};

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const {id} = jwt.verify(token, SECRET_KEY);
    console.log(id);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2ViNmY4MDFlNTJhYzMyZWIyMDU4NyIsImlhdCI6MTY4MTgzMjIwOSwiZXhwIjoxNjgxOTE1MDA5fQ.fVrJeuP2VDYTh28mO13QORVbrRooZ8u5zG3psjDATVy";
    jwt.verify(invalidToken, SECRET_KEY);
}
catch(error) {
    console.log(error.message)
}