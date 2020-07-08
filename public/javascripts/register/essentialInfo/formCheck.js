import idValidator from '../../utils/idValidator.js';
import passwordValidator from '../../utils/passwordValidator.js';
import phoneNumReorder from '../../utils/phoneNumReorder.js';
import emailValidator from '../../utils/emailValidator.js';
import nameValidator from '../../utils/nameValidator.js';

function checkId() {
    const inputId = document.getElementsByName('id')[0];
    const id = inputId.value;
    const errorId = document.querySelector('.errorId')
    if (idValidator(id)) {
        errorId.textContent = '입력하신 아이디로 사용이 가능합니다'
        errorId.style.color = "gray";
        inputId.style.borderColor = "black";
        errorId.style.display = "block";
    } else {
        errorId.textContent = '입력하신 아이디로 사용이 불가합니다'
        errorId.style.color = "red";
        inputId.style.borderColor = "red";
        errorId.style.display = "block";
        inputId.focus();
    }
}

function checkEmail(){
    const Email = document.getElementById('email-first');
    if(!Email.value.length){
        Email.style.borderColor = "red";
        Email.focus();
    }else{
        Email.style.borderColor = "black";
    }
}

function checkEmailDomain() {
    const inputEmail = document.querySelector('.email-second')
    const email = inputEmail.value
    console.log(email);
    const errorEmail = document.querySelector('.errorEmail')
    if (emailValidator(email)) {
        inputEmail.style.borderColor = 'black';
        errorEmail.style.display = 'block';
        errorEmail.innerText = '사용가능한 이메일입니다'
        errorEmail.style.color = "gray";
    } else {
        inputEmail.style.borderColor = 'red';
        errorEmail.style.display = 'block';
        if (email.length == 0) errorEmail.textContent = '이메일주소를 입력해주세요'
        else errorEmail.innerText = '사용불가한 이메일입니다'
        errorEmail.style.color = "red";
        inputEmail.focus();
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
    } else {
        errorPassword.style.display = "none";
        inputPassword.style.borderColor = "black";
    }
}

function comparePassword() {
    const inputPassword = document.getElementsByName('password')[0];
    const inputPasswordSecond = document.getElementsByName('passwordSecond')[0]
    const password = inputPassword.value;
    const passwordSecond = inputPasswordSecond.value;
    const errorPassworSecond = document.querySelector('.errorPasswordSecond');
    const ERR_MESSAGE = "위 비밀번호와 일치하지 않습니다. 다시 입력해주세요.";
    if (password !== passwordSecond) {
        errorPassworSecond.style.display = "block";
        errorPassworSecond.innerHTML = ERR_MESSAGE;
        inputPasswordSecond.style.borderColor = "red";
        inputPasswordSecond.focus();
    } else {
        errorPassworSecond.style.display = "none";
        inputPasswordSecond.style.borderColor = "black";
    }
}

function checkPhoneNum(e){
    const keyCode = e.keyCode;
    if(keyCode<48 || keyCode>57){
        if(keyCode != 8) return false;
    }
    return true;
}

function checkPhoneNumEmpty(){
    const inputPhoneNum = document.getElementById('phone');
    if(!inputPhoneNum.value.length){
        inputPhoneNum.style.borderColor = "red";
        inputPhoneNum.focus();
    }else{
        inputPhoneNum.style.borderColor = "black";
    }
}

function reorderPhoneNum(e) {
    const inputPhoneNum = document.getElementById('phone')

    checkPhoneNumEmpty();

    if(e.keyCode === 8 ) return;
    if(checkPhoneNum(e)){
        const phoneNum = inputPhoneNum.value;
        const reorderedNum = phoneNumReorder(phoneNum);
        inputPhoneNum.value = reorderedNum;
    }else{
        inputPhoneNum.value = '';
    }
}

function checkName(){
    const inputName = document.getElementById('name');
    const name = inputName.value;
    const errorName = document.querySelector('.errorName');
    if(nameValidator(name)){
        errorName.style.display = "none";
        inputName.style.borderColor = "black";
    }else{
        errorName.style.display="block";
        errorName.textContent = "특수문자나 숫자는 사용할 수 없습니다";
        inputName.style.borderColor = "red";
        inputName.focus();
    }
}

export {
    checkId,
    checkEmail,
    checkEmailDomain,
    checkPassword,
    comparePassword,
    checkPhoneNum,
    reorderPhoneNum,
    checkName,
}