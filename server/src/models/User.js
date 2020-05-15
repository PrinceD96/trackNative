const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

userSchema.pre('save', function (next) {
	const user = this;

	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(14, (error, salt) => {
		if (error) {
			return next(error);
		}

		bcrypt.hash(user.password, salt, (error, hash) => {
			if (error) {
				return next(error);
			}
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function (candidatePassword) {
	const user = this;
	return new Promise((resolve, reject) => {
		bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
			if (error) {
				return reject(error);
			}

			if (!isMatch) {
				return reject(false);
			}

			resolve(true);
		});
	});
};

mongoose.model('User', userSchema);
