var fs = require('fs');
var CryptoJS = require("crypto-js");
var key = 'key.key.key.key';

getPass().then((rawPass) => {
  console.log(`raw: ${rawPass}`);
  decrypt(rawPass).then((pass) => {
    console.log(pass);
  });
})



  function getPass() {
    return new Promise((res,rej) => {
      fs.readFile('/volumes/pass/password', function read(err, data) {
          if (err) {
              throw err;
              rej(err);
          }
          res(data);

      });
    })
  }

  function decrypt(text){
    return new Promise((res,rej) => {
      try {
        var bytes  = CryptoJS.AES.decrypt(text.toString(), key);
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);

        res(plaintext);
      } catch(err) {
        rej(err);
      }
    })
  }
