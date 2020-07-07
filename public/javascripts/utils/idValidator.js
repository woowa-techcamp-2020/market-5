const idReg = /^[a-z0-9-_]{4,20}$/;

function idValidator(id) {
    //const inputId = document.querySelector('body > div > form > div > div > input:nth-child(2)').value
    if (idReg.test(id)) {
        return true;
    } else {
        return false
    }
}

export default idValidator;