const { APIError } = require("../MiddleWares/ErrorHandler");
const User = require("../Models/UserModel")

async function createUser(userPayload) {
    const user = await getUserByEmail(userPayload.email);
    if (user) {
        throw new APIError(400, "Email is already taken");
    }
    return User.create(userPayload);
}

function getUserByID(id) {
    return User.findById(id);
}

function getUserByEmail(email) {
    return User.findOne({ email })
}



exports.createUser = createUser;
exports.getUserByID = getUserByID;
exports.getUserByEmail = getUserByEmail;