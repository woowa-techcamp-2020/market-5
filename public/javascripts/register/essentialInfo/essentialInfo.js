import {
    checkId,
    checkEmail,
    checkEmailDomain,
    checkPassword,
    comparePassword,
    checkPhoneNum,
    reorderPhoneNum,
    checkName,
} from './formCheck.js';

import {
    countDown,
    getMinuteAndSecond,
    certify,
    verify,
} from './verification.js';

// 아이디
const inputId = document.getElementsByName('id')[0];
// 패스워드
const inputPassword = document.getElementsByName('password')[0];
const inputPasswordSecond = document.getElementsByName('passwordSecond')[0]
// 휴대폰 번호
const inputPhoneNum = document.getElementById('phone')
// 이름
const inputName = document.getElementById('name'); 
// 이메일
const inputEmail = document.querySelector('.email-first');
const inputEmailDomain = document.querySelector('.email-second');
const selectEmail = document.querySelector('.email')
// 인증
const certificationButton = document.querySelector('#certification')
const verficationButton = document.querySelector('#verficationButton');

inputId.addEventListener('keyup', checkId);

inputPassword.addEventListener('keyup', checkPassword);
inputPasswordSecond.addEventListener('keyup', comparePassword);

inputPhoneNum.addEventListener('keyup', reorderPhoneNum);

inputName.addEventListener('keyup', checkName)

inputEmail.addEventListener('keyup', checkEmail);
inputEmailDomain.addEventListener('keyup', checkEmailDomain);
inputEmailDomain.addEventListener('change', checkEmailDomain);
selectEmail.addEventListener('change', addEmail);

certificationButton.addEventListener('click', certify)
verficationButton.addEventListener('click', verify)

function addEmail() {
    const email = selectEmail.value;
    if (email.length) {
        if (email == 'self') {
            inputEmailDomain.value = "";
            inputEmailDomain.disabled = false;
        } else {
            document.querySelector('.email-second').style.borderColor = 'black';
            inputEmailDomain.value = email;
            inputEmailDomain.disabled = true;
            document.querySelector('.errorEmail').style.display = 'none';
        }
    }
}
