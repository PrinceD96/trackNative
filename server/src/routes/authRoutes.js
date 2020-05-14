const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

router.post('/signup', async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = new User({ email, password });
		await user.save();

		const token = jwt.sign({ userId: user._id }, 'My_Secret_Key');
		res.status(201).send({ message: 'Post request successful', token });
	} catch (error) {
		return res.status(422).send(error.message);
	}
});

module.exports = router;
