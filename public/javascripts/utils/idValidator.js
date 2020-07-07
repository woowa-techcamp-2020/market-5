const idReg = /^[a-z0-9-_]{4,20}$/;

function idValidator(id) {
    //const inputId = document.querySelector('body > div > form > div > div > input:nth-child(2)').value
    if (idReg.test(id)) {
        return
    } else {
        return false
    }
}

module.exports = idValidator;