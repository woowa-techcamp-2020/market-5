function passwordValidator(value){
    const length = value.length;
    if(length < 8 || length > 20) return '비밀번호는 8~20자 이내로 작성해주세요';
    return checkEngOrNum(value);
}

function checkEngOrNum(value){
    for(let i=0; i<value.length; i++){
        if(value[i].charCodeAt(0)<48 || value[i].charCodeAt(0)>122) return '비밀번호는 영문과 숫자로만 작성해주세요';
    }
    return '';
}

// module.exports = passwordValidator;
export default passwordValidator;