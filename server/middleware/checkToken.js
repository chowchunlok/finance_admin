const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
	// if (req.headers['authorization']) {
	let token = req.headers['authorization'].split(' ')[1]
	// jwt.verify(token, secretOrPublicKey, [options, callback])
	jwt.verify(token, 'secret', (err, decoded) => {
		if (err) {
			// console.log(err)
			res.json({
				code: 401,
				message: 'token过期',
				expiredAt: err.expiredAt
			})
		} else {
			console.log(decoded)
			next()
		}
	})
	// } else {
	// 	res.json({
	// 		code: 401,
	// 		message: 'token丢失'
	// 	})
	// }
	// let token = req.headers['authorization'].split(' ')[1]
	// // 解构 token，生成一个对象 { name: xx, iat: xx, exp: xx }
	// let decoded = jwt.decode(token, 'secret')
	// // console.log(decoded.exp)
	// // console.log(Date.now() / 1000)
	// // 监测 token 是否过期
	// if (token && decoded.exp <= Date.now() / 1000) {
	// 	return res.json({
	// 		code: 401,
	// 		message: 'token过期，请重新登录'
	// 	})
	// }
}
