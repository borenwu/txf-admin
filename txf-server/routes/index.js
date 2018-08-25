var express = require('express');
var router = express.Router();
var asyncBusboy = require('async-busboy');
var qn = require('qn');


const client = qn.create({
  accessKey: 'rsnQ1mPiWJwthOmbSSIfwvsKkNX0ZzTrISaLMlM0',
  secretKey: 'Gu00U4X8-KUgHIAybg4TeeZnhjRX5d7-Dn8Jo89M',
  bucket: 'taoxianfeng',
  origin: 'pa3iktbos.bkt.clouddn.com',

  // timeout: 3600000, // default rpc timeout: one hour, optional
  // if your app outside of China, please set `uploadURL` to `http://up.qiniug.com/`
  // uploadURL: 'http://up.qiniu.com/',
});


function upload(path, key) {
  return new Promise((resolve, reject) => {
    client.uploadFile(path, { key: `${key}` }, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result);
      }

      // {
      //   hash: 'FhGbwBlFASLrZp2d16Am2bP5A9Ut',
      //   key: 'qn/lib/client.js',
      //   url: 'http://qtestbucket.qiniudn.com/qn/lib/client.js'
      //   "x:ctime": "1378150371",
      //   "x:filename": "client.js",
      //   "x:mtime": "1378150359",
      //   "x:size": "21944",
      // }
    });
  })
}


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/weapp/upload', async (req, res, next) => {
  const { files } = await asyncBusboy(req);
  try {
    let result = await upload(files[0].path, files[0].filename);
    res.json({
      data:{
        name: files[0].filename,
        url: result.url,
        msg: 'success'
      }
    })
  } catch (e) {
    res.json({
      code: -1,
      data: {
        msg: '上传失败：' + e.sqlMessage
      }
    })
  }
})

module.exports = router;
