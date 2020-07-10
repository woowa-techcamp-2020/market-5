const Login = document.querySelector('.NanumSquareRound').getElementsByTagName('input')[0];
const IdSave = document.getElementById('id-save');
const LoginButton = document.getElementById('login-button');

const parsedCookie = cookieParser(document.cookie)
console.log(parsedCookie);
window.addEventListener('DOMContentLoaded', () => {
    if(parsedCookie['id']) {
        IdSave.checked = true;
        Login.value = parsedCookie['id'];
    }
})

LoginButton.addEventListener('click', (e) => {
    // e.preventDefault();
    if(!IdSave.checked){
        if(parsedCookie['id'].length){
            console.log('실행');
            document.cookie=`sessionID=${parsedCookie['sessionID']}; id=`;
        }
    }
})

function cookieParser(cookies){
    const cookieList = cookies.split(';');
    const parsedCookie = {}

    cookieList.forEach(cookie => {
        const keyValue = cookie.split('=');
        parsedCookie[keyValue[0].trim()] = keyValue[1].trim();
    })

    return parsedCookie;
}
console.log(Login)

