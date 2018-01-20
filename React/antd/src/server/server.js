const express = require('express')
const app = express()
const fs = require('fs')
const BodyParser = require('body-parser')
app.use(BodyParser.json())
app.post('/test/list', (req, res) => {
	let {pageSize, page} = req.body
	let list = JSON.parse(fs.readFileSync('../data/list.json'))
    let newList = list.slice((page - 1) * pageSize, page * pageSize)
	res.end(JSON.stringify({code:1, mag: 'success', list: newList, len: list.length}))
})
app.listen(8888, () => console.log('listening...'))