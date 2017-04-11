var CryptoJS = require("crypto-js");
var password = 'password';
var key = 'key.key.key.key';


// Encrypt
var ciphertext = CryptoJS.AES.encrypt(password, key);

console.log(ciphertext.toString());
