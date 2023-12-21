const bcryptjs = require("bcryptjs");
const userService = require("../services/users.services.js");

exports.register = (req, res ,next) => {
		const body = {
			'email': req.body.email,
			'username': req.body.username
		}
    console.log("Request Body:", body);
    const { password } = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);
    console.log("Hashed Password:", req.body.password);

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

    userService.login({username, password }, (error, result) => {
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
    return res.status(200).json({message: "Authorized User!" });
};
