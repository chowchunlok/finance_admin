/**
 * jwt is suitable for pass some no-sensitive information to web-application
 */
var jwt = require('jsonwebtoken')
module.exports = function(name) {
	// jwt.sign(payload, secretOrPrivateKey, [options, callback])
	const token = jwt.sign(
		{
			name: name
		},
		'secret',
		{ expiresIn: '10s' }
	)
	return token
}
