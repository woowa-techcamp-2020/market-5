const nameReg = /[0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;

function nameValidator(id) {
    //const inputName = document.querySelector('body > div > form > div > div > input:nth-child(7)').value
    if (nameReg.test(id)) {
        return false
    } else {
        return true
    }
}

export default nameValidator;