import idValidator from '../../utils/idValidator.js'
import passwordValidator from '../../utils/passwordValidator.js';
import phoneNumReorder from '../../utils/phoneNumReorder.js';
import emailValidator from '../../utils/emailValidator.js';
import nameValidator from '../../utils/nameValidator.js';

let isDuplicateCheck = false

function onKeyUpIdInput() {
    isDuplicateCheck = false;
    checkId();
}

function checkId() {
    const inputId = document.getElementsByName('id')[0];
    const id = inputId.value;
    const errorId = document.querySelector('.errorId')
    if (idValidator(id)) {
        if(isDuplicateCheck) return true;
        errorId.textContent = '중복체크를 해주세요'
        errorId.style.color = "red";
        inputId.style.borderColor = "red";
        errorId.style.display = "block";
        inputId.focus();
        return false;
    } else {
        errorId.textContent = '입력하신 아이디로 사용이 불가합니다'
        errorId.style.color = "red";
        inputId.style.borderColor = "red";
        errorId.style.display = "block";
        inputId.focus();
        return false;
    }
}

function postData(url = '', data = {}) {
    // Default options are marked with *
    return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json()); // parses JSON response into native JavaScript objects 
}

async function hasId() {
    const inputId = document.getElementsByName('id')[0];
    const id = inputId.value;
    const errorId = document.querySelector('.errorId')
        // Example POST method implementation:
    const result = (await postData('http://localhost:8000/register/check/id', { id: id })).hasId
    if (!idValidator(id)) {
        errorId.textContent = '입력하신 아이디로 사용이 불가합니다'
        errorId.style.color = "red";
        inputId.style.borderColor = "red";
        errorId.style.display = "block";
        inputId.focus();
        return false;
    } else if (result) {
        errorId.textContent = '이미 사용중인 아이디입니다'
        errorId.style.color = "red";
        inputId.style.borderColor = "red";
        errorId.style.display = "block";
        return true;
    } else {
        errorId.textContent = '입력하신 아이디로 사용이 가능합니다'
        errorId.style.color = "black";
        inputId.style.borderColor = "black";
        errorId.style.display = "block";
        isDuplicateCheck = true
        inputId.focus();
        return false;
    }
}

function checkEmail() {
    const Email = document.getElementById('email-first');
    if (!Email.value.length) {
        Email.style.borderColor = "red";
        Email.focus();
        return false;
    } else {
        Email.style.borderColor = "black";
        return true;
    }
}

function checkEmailDomain() {
    const inputEmail = document.querySelector('.email-second')
    const email = inputEmail.value
    const errorEmail = document.querySelector('.errorEmail')
    if (emailValidator(email)) {
        inputEmail.style.borderColor = 'black';
        errorEmail.style.display = 'block';
        errorEmail.innerText = '사용가능한 이메일입니다'
        errorEmail.style.color = "gray";
        return true;
    } else {
        inputEmail.style.borderColor = 'red';
        errorEmail.style.display = 'block';
        if (email.length == 0) errorEmail.textContent = '이메일주소를 입력해주세요'
        else errorEmail.innerText = '사용불가한 이메일입니다'
        errorEmail.style.color = "red";
        document.querySelector('.email').focus();
        // inputEmail.focus();
        return false;
    }
}

function checkPassword() {
    const inputPassword = document.getElementsByName('password')[0];
    const password = inputPassword.value;
    const result = passwordValidator(password);
    const errorPassword = document.querySelector('.errorPassword');
    if (result.length) {
        errorPassword.style.display = "block";
        errorPassword.textContent = result;
        inputPassword.style.borderColor = "red";
        inputPassword.focus();
        return false;
    } else {
        errorPassword.style.display = "none";
        inputPassword.style.borderColor = "black";
        return true;
    }
}

function comparePassword() {
    const inputPassword = document.getElementById('password');
    const inputPasswordSecond = document.getElementById('passwordSecond')
    const password = inputPassword.value;
    const passwordSecond = inputPasswordSecond.value;
    const errorPassworSecond = document.querySelector('.errorPasswordSecond');
    const ERR_MESSAGE = "위 비밀번호와 일치하지 않습니다. 다시 입력해주세요.";
    if (password !== passwordSecond) {
        errorPassworSecond.style.display = "block";
        errorPassworSecond.innerHTML = ERR_MESSAGE;
        inputPasswordSecond.style.borderColor = "red";
        return false;
    } else {
        errorPassworSecond.style.display = "none";
        inputPasswordSecond.style.borderColor = "black";
        return true;
    }
}

function checkPhoneNum(e) {
    const keyCode = e.keyCode;
    if (keyCode < 48 || keyCode > 57) {
        if (keyCode != 8) return false;
    }
    return true;
}

function checkPhoneNumEmpty() {
    const inputPhoneNum = document.getElementById('phone');
    if (!inputPhoneNum.value.length) {
        inputPhoneNum.style.borderColor = "red";
        inputPhoneNum.focus();
        return false;
    } else {
        inputPhoneNum.style.borderColor = "black";
        return true;
    }
}

function reorderPhoneNum(e) {
    const inputPhoneNum = document.getElementById('phone')

    checkPhoneNumEmpty();

    if (e.keyCode === 8) return;
    if (checkPhoneNum(e)) {
        const phoneNum = inputPhoneNum.value;
        const reorderedNum = phoneNumReorder(phoneNum);
        inputPhoneNum.value = reorderedNum;
    } else {
        inputPhoneNum.value = '';
    }
}

function checkName() {
    const inputName = document.getElementById('name');
    const name = inputName.value;
    const errorName = document.querySelector('.errorName')
    if (!nameValidator(name) || name.length == 0) {
        errorName.innerText = '입력하신 이름으로 사용이 불가합니다'
        errorName.style.color = "red"
        inputName.style.borderColor = "red"
        errorName.style.display = "block"
        return false;
    } else {
        errorName.style.display = "block"
        errorName.innerText = '입력하신 이름으로 사용이 가능합니다'
        errorName.style.color = "gray"
        inputName.style.borderColor = "black"
        return true;
    }
}

export {
    onKeyUpIdInput,
    checkId,
    checkEmail,
    checkEmailDomain,
    checkPassword,
    comparePassword,
    checkPhoneNumEmpty,
    checkPhoneNum,
    reorderPhoneNum,
    checkName,
    hasId,
}