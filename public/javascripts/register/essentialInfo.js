import idValidator from '../utils/idValidator.js';
import passwordValidator from '../utils/passwordValidator.js';
import phoneNumReorder from '../utils/phoneNumReorder.js';
import emailValidator from '../utils/emailValidator.js';
import nameValidator from '../utils/nameValidator.js';

// 아이디
const inputId = document.getElementsByName('id')[0];
// 패스워드
const inputPassword = document.getElementsByName('password')[0];
const inputPasswordSecond = document.getElementsByName('passwordSecond')[0];
// 휴대폰 번호
const inputPhoneNum = document.getElementById('phone');
// 이메일
const inputEmail = document.querySelector('.email-second');
const selectEmail = document.querySelector('.email');
// 인증
const certificationButton = document.querySelector('#certification');
const verficationButton = document.querySelector('#verficationButton');
// 이름
const inputName = document.querySelector('.name');

inputId.addEventListener('keyup', checkId);

inputPassword.addEventListener('keyup', checkPassword);
inputPasswordSecond.addEventListener('keyup', comparePassword);

inputPhoneNum.addEventListener('keyup', reorderPhoneNum);

inputEmail.addEventListener('keyup', checkEmail);
inputEmail.addEventListener('change', checkEmail);
selectEmail.addEventListener('change', addEmail);

inputName.addEventListener('keyup', checkName);

certificationButton.addEventListener('click', certify)
verficationButton.addEventListener('click', verify)

let interval = null;
const TIMER_SECONDS = 120;

function checkName() {
    const name = inputName.value;
    const errorName = document.querySelector('.errorName')
    if (!nameValidator(name) || name.length == 0) {
        errorName.innerText = '입력하신 이름으로 사용이 불가합니다'
        errorName.style.color = "red"
        inputName.style.borderColor = "red"
        errorName.style.display = "block"
    } else {
        errorName.style.display = "block"
        errorName.innerText = '입력하신 이름으로 사용이 가능합니다'
        errorName.style.color = "gray"
        inputName.style.borderColor = "black"
    }
}

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

function checkPhoneNum(e) {
    const keyCode = e.keyCode;
    if (keyCode < 48 || keyCode > 57) {
        if (keyCode != 8) return false;
    }
    return true;
}

function reorderPhoneNum(e) {
    if (e.keyCode === 8) return;
    if (checkPhoneNum(e)) {
        const phoneNum = inputPhoneNum.value;
        const reorderedNum = phoneNumReorder(phoneNum);
        inputPhoneNum.value = reorderedNum;
    } else {
        inputPhoneNum.value = '';
    }
}

function countDown(time, timeLeftBox) {
    interval = setInterval(() => {
        if (time == 0) {
            timeLeftBox.textContent = '입력시간을 초과하였습니다';
            clearInterval(interval);
        }
        const timeLeft = getMinuteAndSecond(time);
        timeLeftBox.textContent = timeLeft;
        time--;
    }, 1000)
}

function getMinuteAndSecond(time) {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    return `${minute} : ${second}`
}

function certify(e) {
    e.preventDefault();
    const text = e.target.textContent;
    const timeLeftBox = document.querySelector('.time-left-box');
    clearInterval(interval);
    countDown(TIMER_SECONDS, timeLeftBox);
    if (text === '인증받기') {
        timeLeftBox.style.display = "inline";
        timeLeftBox.style.position = "absolute"
        timeLeftBox.style.top = "15px";
        timeLeftBox.style.right = "20px";
        timeLeftBox.style.color = "red";
        e.target.textContent = '재전송';
        document.querySelector('.verification-box').style.display = "block";
        e.target.style.borderColor = "blue";
        e.target.style.color = "blue";
        document.querySelector('.verification-message').style.display = "block";
        document.querySelector('#verificationInput').style.borderColor = "red";
    }
}

function verify(e) {
    e.preventDefault();
    const verificationNum = document.querySelector('#verificationInput').value;
    if (verificationNum !== '1234') {
        document.querySelector('.verification-message').textContent = "맞지 않습니다.";
        document.querySelector('.verification-message').style.color = "red";
        return;
    }
    document.querySelector('.verification-box').style.display = "none";
    document.querySelector('.time-left-box').style.display = "none";
    document.querySelector('#certification').textContent = "인증되었습니다"
}