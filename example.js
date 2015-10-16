var http = require('http');
var captcha = require('./captcha');
var url = require('url');

function listern(req, res) {
  var parseUrl = url.parse(req.url);
  if (parseUrl.pathname === '/captcha') {
    var beforReqEndHooks = function(t) {
      console.log('...', t);
    }
    var t = captcha({beforReqEndHooks: beforReqEndHooks}, res);
    console.log(t)
  } else {
    res.end()
  }
}

http.createServer(listern).listen(9008, function() {
  console.log('server was running at 9008');
});
