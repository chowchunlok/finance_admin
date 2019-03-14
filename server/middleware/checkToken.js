const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
	let token = req.headers['authorization'].split(' ')[1]
	// jwt.verify(token, secretOrPublicKey, [options, callback])
	jwt.verify(token, 'secret', (err, decoded) => {
		if (err) {
			res.json({
				code: 5014,
				message: err.message,
				expiredAt: err.expiredAt
			})
		} else {
			req.adminName = decoded.name // 解析出客户端用户名
			next()
		}
	})
}
