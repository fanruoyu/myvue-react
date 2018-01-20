const express = require('express');
const app = express();
const body_parser  = require('body-parser');
const multer = require('multer');
app.use(body_parser.json())
app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
})
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './upload')
    }, 
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
    	// console.log(file)
        cb(null, file.fieldname +  "_" + file.originalname)
    }
});  
// 添加配置文件到muler对象。
var uploader = multer({
        storage: storage
});
app.post('/api/upload', uploader.single('file'), (req, res) => {
	console.log(req.body)
	res.end('success');
})
app.listen(3000, () => {console.log('listening')})
