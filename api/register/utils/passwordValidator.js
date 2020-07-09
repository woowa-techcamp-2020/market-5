function passwordValidator(value){
    const length = value.length;
    if(length < 8 || length > 20) return false;
    return checkEngOrNum(value);
}

function checkEngOrNum(value){
    for(let i=0; i<value.length; i++){
        if(value[i].charCodeAt(0)<48 || value[i].charCodeAt(0)>122) return false;
    }
    return true;
}

// module.exports = passwordValidator;
module.exports = passwordValidator;