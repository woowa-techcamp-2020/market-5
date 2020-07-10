import {
    checkId,
    hasId,
    checkEmail,
    checkEmailDomain,
    checkPhoneNumEmpty,
    checkPassword,
    comparePassword,
    checkName,
} from './essentialInfo/formCheck.js';

import { checkVerification } from './essentialInfo/verification.js';
const inputPasswordSecond = document.getElementById('passwordSecond');

const registerButton = document.querySelector('.register-button');
registerButton.addEventListener('click', submitRegister)

function submitRegister(e) {
    e.preventDefault();

    if (!checkId()) return;
    if (!checkPassword()) return;
    if (!comparePassword()) return inputPasswordSecond.focus();
    if (!checkEmail()) return;
    if (!checkEmailDomain()) return;
    if (!checkPhoneNumEmpty()) return;
    if (!checkName()) return;
    if (!checkAgreement()) return;
    if (!checkVerification()) return;

    const formData = makeFormData();
    postRegister(formData)
        .then(res => {
            return res.json()
        })
        .then(res => {
            alert(res.mes);
            if(res.status === 400) {
                alert('다시 입력해주세요');
                location.href = '/register';
            }
            const id = formData.get('id');
            const password = formData.get('password');
            return postLogin(id, password);
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            if (res.msg) alert(res.mes);
            if(res.status === 400) location.href="/login";
            else location.href = "/register/success"
        })
        .catch(err => {
            location.href = "/login"
        })
}

function postLogin(id, password) {
    const url = '/login';
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            password,
            register: true
        })
    })
}

function postRegister(formData) {
    const url = '/register';
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
    })
}

function makeFormData() {

    const registerForm = document.getElementById('register-form');
    const formData = new FormData(registerForm);

    const emailFirst = document.getElementById('email-first').value;
    const emailSecond = document.getElementById('email-second').value;
    const email = emailFirst + '@' + emailSecond;

    const addressFirst = document.getElementById('address').value;
    const addressDetail = document.getElementById('address-detail').value;
    const address = addressFirst + ' ' + addressDetail;

    const essentialAgreement = document.getElementById('essential-agreement').checked;

    formData.append('email', email);
    formData.append('essentialAgreement', essentialAgreement);
    formData.append('address', address);

    return formData;
}

function checkAgreement() {
    const checkmarkEssential = document.querySelector('#essential-label')
    if (!document.getElementById('essential-agreement').checked) {
        checkmarkEssential.style.outline = "0.5px solid red";
        checkmarkEssential.focus();
    } else {
        checkmarkEssential.style.outline = 'none';
        return true;
    }
}