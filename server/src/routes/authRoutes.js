const router = require("express").Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.post("/signup", async (req, res) => {
	const { email, password } = req.body;

	const user = new User({ email, password });
	await user.save();

	res.status(201).send("Post request successful");
});

module.exports = router;
