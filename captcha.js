var _ = require('lodash');
var Canvas = require('canvas');

module.exports = n_captcha;
function n_captcha(options, res) {

  function genUid(len) {
    len = len || 4;
    var str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = [];
    for(var i = 0; i < len; i++) {
      result.push(str[Math.random() * str.length | 0])
    }
    return result.join('');
  }
  var defaultConfig = {
    textLen: 4,
    color: '#2897CE',
    background: '#DFDFDF',
    lineWidth: 3,
    fontSize: 3,
    imageW: 200,
    level: 3,
    bcColor: '#97BFB2',
    beforReqEndHooks: function(){},
    imageH: 80
  };
  var config = _.assign(defaultConfig, options);
  config.text = genUid(config.textLen);
  var canvas = new Canvas(config.imageW, config.imageH);
  var ctx = canvas.getContext('2d');
  ctx.antialias = 'gray';
  ctx.fillStyle = config.background;
  ctx.fillRect(0, 0, config.imageW, config.imageH);
  ctx.fillStyle = config.color;
  ctx.lineWidth = config.lineWidth;
  // ctx.strokeStyle = config.color;
  ctx.font = config.fontSize + 'px sans';


  //Bézier curve
  ctx.strokeStyle = config.bcColor;
  for (var i = 0; i < config.level; i++) {
    ctx.beginPath();
    ctx.moveTo(20, Math.random() * config.imageH);
    ctx.bezierCurveTo(Math.random() * config.imageH, Math.random() * config.imageH, Math.random() * config.imageH, Math.random() * config.imageH, config.imageW, Math.random() * config.imageH);
    ctx.stroke();
  }


  //draw txt
  var text = config.text;
  ctx.strokeStyle = config.color;
  for (i = 0; i < text.length; i++) {
    ctx.setTransform(Math.random() * 0.5 + 1, Math.random() * 0.4, Math.random() * 0.4, Math.random() * 0.5 + 1, 30 * i + 20, 50);
    ctx.fillText(text.charAt(i), 0, 0);
  }

  config.beforReqEndHooks && config.beforReqEndHooks(config.text);
  //stream
  var stream = canvas.createPNGStream();
  var bufArr = [];
  stream.on('data', function(chunk) {
    bufArr.push(chunk);
  });
  stream.on('end', function() {
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-cache, private, no-store'
    });
    res.write(Buffer.concat(bufArr));
    res.end();
  });
  return config.text;
}
