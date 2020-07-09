var emailReg = /^([\da-z\.-]+)\.([a-z\.]{2,6})$/

function emailValidator(emailSecond) {
    //const inputEmail = document.querySelector('.email-second').value
    if (emailReg.test(emailSecond)) {
        return true
    } else {
        return false
    }
}

module.exports = emailValidator;