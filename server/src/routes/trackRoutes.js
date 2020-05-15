const router = require('express').Router();
const mongoose = require('mongoose');

const requireAuth = require('../middlewares/requiredAuth');

const Track = mongoose.model('Track');

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
	const id = req.user._id;
	const tracks = await Track.find({ userId: id });

	res.status(200).send(tracks);
});

router.post('/tracks', async (req, res) => {
	const id = req.user._id;
	const { name, locations } = req.body;

	if (!name || !locations) {
		return res
			.status(422)
			.send({ error: 'You must provide a name and locations' });
	}

	try {
		const track = new Track({ userId: id, name, locations });
		await track.save();
		res.status(201).send(track);
	} catch (error) {
		res.status(422).send({ error: error.message });
	}
});

module.exports = router;
