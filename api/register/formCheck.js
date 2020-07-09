const idValidator = require('./utils/idValidator.js');
const passwordValidator = require('./utils//passwordValidator.js')
const emailValidator = require('./utils/emailValidator.js')
const nameValidator = require('./utils/nameValidator.js')

function formCheck(userInfo){

    if(!idValidator(userInfo.id)) return false;
    if(!passwordValidator(userInfo.password)) return false;

    const emailSplit = userInfo.email.split('@');
    if(!emailValidator(emailSplit[1])) return false;

    if(!nameValidator(userInfo.username)) return false;
    if(!checkPhoeNum(userInfo.phoneNum)) return false;
    if(!checkEssentialAgreement(userInfo.essentialAgreement)) return false;

    return true;
}

function checkPhoeNum(phoneNum){
    if(!phoneNum.length) return false;
    return true;
}

function checkEssentialAgreement(essentialAgreement){
    if(!essentialAgreement) return false;
    return true;
}

module.exports = formCheck;