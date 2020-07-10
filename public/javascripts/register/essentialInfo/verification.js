import { checkPhoneNumEmpty } from './formCheck.js';

let interval = null;
const TIMER_SECONDS = 120;

let verified = false;

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

    if (!checkPhoneNumEmpty()) {
        return alert('휴대폰 번호를 먼저 입력해주세요');
    }

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
    document.querySelector('#certification').textContent = "인증 완료"
    verified = true;
}

function checkVerification() {
    if(!verified) {
        const certification = document.getElementById('certification');
        certification.style.borderColor = 'red';
        certification.focus();
    }
    return verified;
}

export {
    countDown,
    getMinuteAndSecond,
    certify,
    verify,
    checkVerification,
}