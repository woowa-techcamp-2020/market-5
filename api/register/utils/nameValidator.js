const nameReg = /[0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]$/;

function checkChar(id) {
    //const inputName = document.querySelector('body > div > form > div > div > input:nth-child(7)').value
    if (nameReg.test(id)) {
        return false
    } else {
        return true
    }
}

function nameValidator(name){
    for(let i=0; i<name.length; i++){
        if(!checkChar(name[i])) return false;
    }
    return true;
}

module.exports = nameValidator;