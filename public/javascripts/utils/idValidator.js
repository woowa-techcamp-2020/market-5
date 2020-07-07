const idReg = /^[a-z0-9-_]*$/;

function idValidator(id) {
    //const inputId = document.querySelector('body > div > form > div > div > input:nth-child(2)').value
    if (id.length < 4 || id.length > 20) return false;
    if (idReg.test(id)) {
        return true
    } else {
        return false
    }
}

module.exports = idValidator;