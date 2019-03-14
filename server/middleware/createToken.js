/**
 * jwt is suitable for pass some no-sensitive information to web-application
 */
var jwt = require('jsonwebtoken')
const server_secret_key = require('../utils/secret')

module.exports = function(name) {
	// jwt.sign(payload, secretOrPrivateKey, [options, callback])
	const token = jwt.sign(
		{
			name: name
		},
		server_secret_key,
		{ expiresIn: '24h' }
	)
	return token
}
