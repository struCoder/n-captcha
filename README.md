# n-captcha
nodejs captcha

How to install
---------------

- brew install pkg-config if you don't have

- brew install cairo if you don't have

- npm install n-captcha --save


Config
-------
```javascript
{
  //verify code length
  textLen: 4,

  //verify code color
  color: '#2897CE',

  //verify code bg-color
  background: '#DFDFDF',

  lineWidth: 3,
  fontSize: 3,
  imageW: 200,
  imageH: 80

  //identify level
  level: 3,

  //bezier Curve color
  bcColor: '#97BFB2',
  beforReqEndHooks: function(){}
}
```



How to use
----------

if you use `express` or `koa` you can use it as middleware

####You server code
```javascript
var app = express()();
var ncaptcha = require('n-captcha');
app.use(function(req, res, next) {
  if (req.url === '/captcha') {
    var verifyCode = ncaptcha({}, res);
    if (req.session) req.session.ncaptcha = verifyCode;
    //do something you need
  }
  next();
})

// route

app.post('/p/doLogin', function() {
  var ncaptcha = req.body.ncaptcha;
  if (ncaptcha !== req.session.ncaptcha) {
    res.json({code: 1000, msg: 'make sure that captcha is right'})
  }
})

```

####You client code
```html
<html>

<body>
  <img src="/captcha">
</body>

</html>

```

license
--------
MIT
