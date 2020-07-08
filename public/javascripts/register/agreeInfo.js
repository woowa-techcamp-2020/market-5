const totalAgreement = document.querySelector('#total-agreement');
const essentialAgreement = document.querySelector('#essential-agreement');
const chooseAgreement = document.querySelector('#choose-agreement');

totalAgreement.addEventListener('click', totalAgree);
essentialAgreement.addEventListener('click', essentialAgree)
chooseAgreement.addEventListener('click', chooseAgree);

function totalAgree(e){
    if(e.target.checked){
        essentialAgreement.checked = true;
        chooseAgreement.checked = true;
    }else{
        essentialAgreement.checked = false;
        chooseAgreement.checked = false;
    }
}

function essentialAgree(e){
    if(e.target.checked){
        totalAgreement.checked = chooseAgreement.checked ? true : false;
    }else{
        totalAgreement.checked = false;
    }
}

function chooseAgree(e){
    if(e.target.checked){
        totalAgreement.checked = essentialAgreement.checked ? true : false;
    }else{
        totalAgreement.checked = false;
    }
}