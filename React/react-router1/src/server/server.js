const express = require('express');
const app = express();
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.get('/admin/login', (req, res) => {
    res.end(JSON.stringify({code:1, msg: 'success'}))
})
app.listen(3001, () => console.log('listening....'))
