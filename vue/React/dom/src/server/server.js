const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())//添加json解析器  
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'X-Requested-With')
	res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
	res.header('X-Powered-By',' 3.2.1')
	res.header('Content-Type', 'application/json;charset=utf-8')
	next()
})
app.post('/admin/list', (req, res) => {
	console.log(req)
	res.end(JSON.stringify({code: 1, mag: 'success'}))
})
app.listen(8080, () => console.log('listening......'))