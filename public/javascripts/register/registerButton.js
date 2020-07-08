import {
    checkId,
    checkEmail,
    checkEmailDomain,
    checkPhoneNumEmpty,
    checkPassword,
    comparePassword,
    checkName,
} from './essentialInfo/formCheck.js';

const registerButton = document.querySelector('.register-button');
registerButton.addEventListener('click', submitRegister)

function submitRegister(e){
    e.preventDefault();
    
    let check = true;

    check = checkId();
    check = checkPassword();
    check = comparePassword();
    check = checkEmail();
    check = checkEmailDomain();
    check = checkPhoneNumEmpty();
    check = checkName();
    check = checkAgreement();
    check = checkVerification();

    if(check) console.log('전송');
}

function checkAgreement(){
    const checkmarkEssential = document.querySelector('#essential-label')
    if(!document.getElementById('essential-agreement').checked){
        checkmarkEssential.style.outline = "0.5px solid red";
        checkmarkEssential.focus();
    }else{
        checkmarkEssential.style.outline = 'none';
        return true;
    }
}

function checkVerification(){
    const certification = document.getElementById('certification');
    if(certification.textContent !== '인증 완료'){
        certification.style.borderColor = 'red';
        return certification.focus();
    }
    return true;
}

