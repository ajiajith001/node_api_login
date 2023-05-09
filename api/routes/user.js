const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

// Login post route
router.post("/login", async (req, res, next) => {
	const { username, password } = req.body;
	// find user
	const user = await User.findOne({ username: username });
	const { TOKEN_KEY } = process.env;

	if (!user) {
		return res.status(400).send("Invalid username");
	}

	// Check if password is correct
	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!passwordMatch) {
		return res.status(400).send("Incorrect password");
	}

	const token = jwt.sign({ user_id: user._id }, TOKEN_KEY, {
		expiresIn: "2h",
	});

	// Save user to session
	req.user = user;
	res.send({
		userId: user.id,
		role: user.role,
		token: token,
	});
});

router.post("/signup", async (req, res, next) => {
	const { username, password } = req.body;
	// find user

	encryptedPassword = await bcrypt.hash(password, 10);
	// Create user in our database
	const user = await User.create({
		username, // sanitize: convert email to lowercase
		password: encryptedPassword,
		role: 2,
	});
	return res.status(201).json({
		message: "user created",
	});
	// const user = await User.findOne({ username: username });
	// console.log(user);
	// console.log("password", password);
	// // console.log("user password",user.password)

	// if (!user) {
	// 	return res.status(400).send("Invalid username");
	// }

	// Check if password is correct
	// const passwordMatch = bcrypt.compare(password, user.password);

	// const passwordMatch = password === user.password;

	// if (!passwordMatch) {
	// 	return res.status(400).send("Incorrect password");
	// }

	// Save user to session
	// req.user = user;
	// delete user.password;
	// res.send({
	// 	user: user,
	// });
});

module.exports = router;
