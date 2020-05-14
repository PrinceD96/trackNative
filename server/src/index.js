require('./models/User');
const server = require('express')();
const mongoose = require('mongoose');
const json = require('express').json();

const authRouter = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requiredAuth');

const mongoUri =
	'mongodb+srv://admin:passwordXXX@cluster0-ipdnx.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true
});

mongoose.connection.on('connected', () => {
	console.log('Connected to Mongo instance');
});
mongoose.connection.on('error', error => {
	console.error('Error connecting to Mongo instance', error);
});

server.use(json);
server.use(authRouter);

server.get('/', requireAuth, (req, res) => {
	res.send(`Your email: ${req.user.email}`);
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
