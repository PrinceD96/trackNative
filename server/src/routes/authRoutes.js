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
		res.status(201).send({ message: 'Signup successful', token });
	} catch (error) {
		return res.status(422).send(error.message);
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(422).send({ error: 'Must provide email and password' });
	}

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(422).send({ error: 'Invalid password or email' });
	}

	try {
		await user.comparePassword(password);
		const token = jwt.sign({ userId: user._id }, 'My_Secret_Key');
		res.status(200).send({ message: 'Login successful', token });
	} catch (error) {
		return res.status(422).send({ error: 'Invalid password or email' });
	}
});

module.exports = router;
