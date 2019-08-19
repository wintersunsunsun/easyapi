var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('hello world!!');
});

router.post('/', function (req, res, next) {
    res.send(req.body);
})

module.exports = router;