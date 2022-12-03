const { Router } = require('express');
const { RequestWrapper } = require('../MiddleWares/RequestWrapper');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require('../Services/UserService');
const { APIError } = require('../MiddleWares/ErrorHandler');
const config = require('../config');
const router = Router();
const tokenParser = require('../MiddleWares/TokenParser');

const salt = bcrypt.genSaltSync(10);

router.post("/register", RequestWrapper(async (req, res) => {

    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        author: req.body.author,
        email: req.body.email,
        password: hash,
    }
    const createdUser = await createUser(user);
    res.send(createdUser);
}))

router.post("/login", RequestWrapper(async (req, res) => {

    if (!req.body.email || !req.body.password) {
        throw new APIError(400, "Please enter a valid email and password")
    }

    const loggedUser = await getUserByEmail(req.body.email);

    if (loggedUser && bcrypt.compareSync(req.body.password, loggedUser.password)) {
        const token = jwt.sign({
            iat: Date.now(),
            sub: loggedUser.id,
            type: "access",
        }, config.tokenEncryption);
        res.send({ token, user: loggedUser });
    }
    else
        throw new APIError(400, "Email or password are incorrect")
}))


router.get("/current-user", tokenParser(false), RequestWrapper((req,res) => {
    res.send(req.user)
}) )



module.exports = router