const bcryptjs = require("bcryptjs");
const userService = require("../services/users.services.js");

exports.register = (req, res, next) => {
    const { password } = req.body;

    // Validate if the password is provided in the request body
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    const salt = bcryptjs.genSaltSync(10);

    // Hash the password before saving it to the database
    req.body.password = bcryptjs.hashSync(password, salt);

    // Call the userService to register the user
    userService.register(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.login = (req, res, next) => {
    const { username, password } = req.body;

    // Call the userService to perform login
    userService.login({ username, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.userProfile = (req, res, next) => {
    return res.status(200).json({ message: "Authorized User!" });
};
