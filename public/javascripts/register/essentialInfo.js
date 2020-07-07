import idValidator from '../utils/idValidator.js';
import passwordValidator from '../utils/passwordValidator.js';
import phoneNumReorder from '../utils/phoneNumReorder.js';


const inputId = document.getElementsByName('id')[0];
const inputPassword = document.getElementsByName('password')[0];
const inputPasswordSecond = document.getElementsByName('passwordSecond')[0]
const inputPhoneNum = document.getElementById('phone')

inputId.addEventListener('keyup', checkId);
inputPassword.addEventListener('keyup', checkPassword);
inputPasswordSecond.addEventListener('keyup', comparePassword);
inputPhoneNum.addEventListener('keyup', reorderPhoneNum);

function checkId() {
    const id = inputId.value;
    const result = idValidator(id);
    const errorId = document.querySelector('.errorId');
    if (result.length) {
        errorId.style.display = "block";
        errorId.innerHTML = result;
        inputId.style.borderColor = "red";
    } else {
        errorId.style.display = "none";
        inputId.style.borderColor = "black";
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