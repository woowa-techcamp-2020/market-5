const pbkdf2 = require('pbkdf2');

function encrypt(data){
    return pbkdf2.pbkdf2Sync(data, 'parknoh', 1, 32, 'sha512').toString("hex");
}

module.exports = encrypt;