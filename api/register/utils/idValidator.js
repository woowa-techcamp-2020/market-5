const idReg = /^[a-z0-9-_]{4,20}$/;


function idValidator(id) {
    //const inputId = document.querySelector('body > div > form > div > div > input:nth-child(2)').value
    // 아이디가 유효하면 true
    if (idReg.test(id)) {
        return true;
    } else {
        return false
    }
}

module.exports = idValidator;