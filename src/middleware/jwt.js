'use strict';

const jwt = require('jsonwebtoken');

const hasAuthHeader = headers => {
	if (headers.authorization == undefined) {
		const err = Error('Unauthenticated user.');
		err.statusCode = 401;
		throw err;
	}

	return true;
};

const tokenFormatIsValid = headers => {
	let parts = headers.authorization.split(' ');

	if (!(parts.length == 2 && parts[0] == 'Bearer')) {
		const err = Error('Invalid Authorization header.');
		err.statusCode = 401;
		throw err;
	}

	return true;
};

const getToken = tokenHeader => {
	let parts = tokenHeader.split(' ');
	return parts[1];
};

module.exports = {
	verify: async function (req, res, next) {
		try {
			hasAuthHeader(req.headers);
			tokenFormatIsValid(req.headers);

			let token = getToken(req.headers.authorization);

			await jwt.verify(token, process.env.JWT_SECRET, (err) => {
				if (err) {
					const err = Error('Unauthenticated user.');
					err.statusCode = 401;
					throw err;
				}

				next();
			});
		} catch (err) {
			return next(err);
		}
	}
};