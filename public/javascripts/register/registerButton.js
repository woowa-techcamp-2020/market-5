import {
    checkId,
    checkEmail,
    checkEmailDomain,
    checkPassword,
    comparePassword,
    checkPhoneNum,
    reorderPhoneNum,
    checkName,
} from './essentialInfo/formCheck.js';

const registerButton = document.querySelector('.register-button');
registerButton.addEventListener('click', submitRegister)

function submitRegister(e){
    e.preventDefault();

    checkId();
    checkPassword();
    comparePassword();
    checkEmail();
    checkEmailDomain();
    checkPhoneNumEmpty();
    checkName();
    checkAgreement();
}

function checkAgreement(){
    const checkmarkEssential = document.querySelector('#essential-label')
    if(!document.getElementById('essential-agreement').checked){
        checkmarkEssential.style.outline = "0.5px solid red";
        checkmarkEssential.focus();
    }else{
        checkmarkEssential.style.outline = 'none';
    }
}

