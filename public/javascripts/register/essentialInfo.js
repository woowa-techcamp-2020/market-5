import idValidator from '../utils/idValidator.js';
import passwordValidator from '../utils/passwordValidator.js';
import phoneNumReorder from '../utils/phoneNumReorder.js';
import emailValidator from '../utils/emailValidator.js';

const inputId = document.getElementsByName('id')[0];
const inputPassword = document.getElementsByName('password')[0];
const inputPasswordSecond = document.getElementsByName('passwordSecond')[0]
const inputPhoneNum = document.getElementById('phone')
const inputEmail = document.querySelector('.email-second')
const selectEmail = document.querySelector('.email')

inputId.addEventListener('keyup', checkId);
inputPassword.addEventListener('keyup', checkPassword);
inputPasswordSecond.addEventListener('keyup', comparePassword);
inputPhoneNum.addEventListener('keyup', reorderPhoneNum);
inputEmail.addEventListener('keyup', checkEmail);
inputEmail.addEventListener('change', checkEmail);
selectEmail.addEventListener('change', addEmail);

function addEmail() {
    const email = selectEmail.value;
    if (email.length) {
        if (email == 'self') {
            inputEmail.value = "";
            inputEmail.disabled = false;
        } else {
            inputEmail.value = email;
            inputEmail.disabled = true;
            document.querySelector('.errorEmail').style.display = 'none';
        }
    }
}

function checkId() {
    const id = inputId.value;
    const errorId = document.querySelector('.errorId')
    if (idValidator(id)) {
        errorId.innerText = '입력하신 아이디로 사용이 가능합니다'
        errorId.style.color = "gray";
        inputId.style.borderColor = "black";
        errorId.style.display = "block";

    } else {
        errorId.innerText = '입력하신 아이디로 사용이 불가합니다'
        errorId.style.color = "red";
        inputId.style.borderColor = "red";
        errorId.style.display = "block";
    }
}

function checkEmail() {
    const email = inputEmail.value
    const errorEmail = document.querySelector('.errorEmail')
    if (emailValidator(email)) {
        inputEmail.style.borderColor = 'black';
        errorEmail.style.display = 'block';
        errorEmail.innerText = '사용가능한 이메일입니다'
        errorEmail.style.color = "gray";
    } else {
        inputEmail.style.borderColor = 'red';
        errorEmail.style.display = 'block';
        if (email.length == 0) errorEmail.innerText = '이메일주소를 입력해주세요'
        else errorEmail.innerText = '사용불가한 이메일입니다'
        errorEmail.style.color = "red";

    }
}

function checkPassword() {
    const password = inputPassword.value;
    const result = passwordValidator(password);
    const errorPassword = document.querySelector('.errorPassword');
    if (result.length) {
        errorPassword.style.display = "block";
        errorPassword.innerHTML = result;
        inputPassword.style.borderColor = "red";

    } else {
        errorPassword.style.display = "none";
        inputPassword.style.borderColor = "black";
    }
}

function comparePassword() {
    const password = inputPassword.value;
    const passwordSecond = inputPasswordSecond.value;
    const errorPassworSecond = document.querySelector('.errorPasswordSecond');
    const ERR_MESSAGE = "위 비밀번호와 일치하지 않습니다. 다시 입력해주세요.";
    if (password !== passwordSecond) {
        errorPassworSecond.style.display = "block";
        errorPassworSecond.innerHTML = ERR_MESSAGE;
        inputPasswordSecond.style.borderColor = "red";
    } else {
        errorPassworSecond.style.display = "none";
        inputPasswordSecond.style.borderColor = "black";
    }
}

function reorderPhoneNum() {
    const phoneNum = inputPhoneNum.value;
    const reorderedNum = phoneNumReorder(phoneNum);
    inputPhoneNum.value = reorderedNum;
}