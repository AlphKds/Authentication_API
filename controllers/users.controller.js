const bcryptjs = require("bcryptjs");
const userService = require("../services/users.services.js");

exports.register = (req, res ,next) => {
    console.log("Request Body:", req.body);
    console.log("Request Body:", req.body);
    const { password } = req.body;
    console.log("Password:", password)
    const salt = bcryptjs.genSaltSync(10);
    console.log("Salt:", salt);

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

exports.getUsers = (req, res, next) => {
	userService.getUsers({}, (error, result) => {
		if (error) {
			return next(error);
		}

		return res.status(200).json({
			message: "Success Get Users",
			users: result,
		});
	});
};
