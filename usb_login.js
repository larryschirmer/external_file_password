var usbDetect = require('usb-detection');
var ncp = require("copy-paste");
const exec = require('child_process').exec;
var fs = require('fs');
var CryptoJS = require("crypto-js");
var key = 'key.key.key.key';
var usbVendorId = 12345;

var usb;
// Detect add/insert
usbDetect.on('add', function(device) {
  if (device.vendorId == usbVendorId) {
    setTimeout(() => {
      getPass().then((rawPass) => {
        decrypt(rawPass).then((pass) => {
          ncp.copy(pass, function () {
            exec(`diskutil list |grep pass`, (e,o,er) => {
              //check for errors and print them out
              if (e) {
                console.error(`exec error: ${e}`);
                return;
              }
              var outputString = o;
              outputString = outputString.substr(outputString.indexOf('disk'));
              outputString = outputString.substr(0, outputString.indexOf('\n'))
              usb = outputString;
              setTimeout(clearPass,7000);
            });
          })
        })
      })
    }, 3000);
  }
 });

function clearPass() {
  ncp.copy('', function () {
    exec(`diskutil unmount /dev/${usb}`, (e,o,er) => {
      //check for errors and print them out
      if (e) {
        console.error(`exec error: ${e}`);
        return;
      }
    });

  });
}

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
