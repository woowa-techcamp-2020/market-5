const nameReg = /^[가-힣]$/;

function nameValidator(id) {
    //const inputName = document.querySelector('body > div > form > div > div > input:nth-child(7)').value
    if (nameReg.test(id)) {
        return false
    } else {
        return true
    }
}

module.exports = nameValidator;