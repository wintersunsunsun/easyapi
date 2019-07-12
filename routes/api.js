var express = require('express');
var router = express.Router();
var crypto = require("crypto");

var algorithm = 'aes-256-cbc';
var key = Buffer.from("please input key", 'utf-8');
var iv = Buffer.from("please input iv", 'utf-8');

function encrypt(obj) {
  var text = JSON.stringify(obj);
  var cipher = crypto.createCipheriv(algorithm, key, iv)
  var crypted = cipher.update(text, 'utf8', 'base64')
  crypted += cipher.final('base64');
  return crypted;
}

function decrypt(text) {
  var cipher = crypto.createDecipheriv(algorithm, key, iv);
  var decoded = cipher.update(text, 'base64', 'utf-8');
  decoded += cipher.final('utf-8');
  return decoded;
}

router.post('/Mobile/QuickLogin', function (req, res, next) {
  req.body.content = decrypt(Buffer.from(req.body.content, "base64"));
  console.log('request:', req.body);

  var resObj = {
    header: {
      trsCode: 'COM00001',
      rtnCode: '0000',
      returnMessage: ''
    },
    content: encrypt({
      SessionKeyCipher: 'com2c2psbcmbanking00000000000001',
      SessionIVCipher: "sbcmbanking00001",
      LoginType: "1",
      URL: "https://ibanking.kh.cathaybk.com/"
    })
  };

  console.log('response', resObj);

  res.json(resObj);
});

router.use(function (err, req, res, next) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('404')
  }
});

module.exports = router;