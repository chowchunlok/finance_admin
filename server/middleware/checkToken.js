const jwt = require('jsonwebtoken')
const server_secret_key = require('../utils/secret')

module.exports = function(req, res, next) {
	let token = req.headers['authorization'].split(' ')[1]
	// jwt.verify(token, secretOrPublicKey, [options, callback])
	jwt.verify(token, server_secret_key, (err, decoded) => {
		// console.log('decoded', decoded) //TODO:debug
		if (err) {
			res.json({
				code: 5000,
				message:
					'You have been logged out, you can cancel to stay on this page, or log in again'
			})
			console.log('token err:', err) // TODO: debug
		} else {
			req.adminName = decoded.name // 解析出客户端用户名
			next()
		}
	})
}
