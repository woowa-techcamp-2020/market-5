const express = require('express');
const { checkId } = require('./api/register/doubleCheck.js')
const formCheck = require('./api/register/formCheck.js');
const { insertUserInfo } = require('./api/register/database.js');

const router = express.Router();
router.get('/', (req, res) => {
    res.render('main'); // (3)
});
router.get('/register', (req, res) => {
    res.render('./Register/register'); // (4)
});

router.post('/register', async (req, res) => {
    const ERRO_MES = '다시 입력해주세요';
    const userInfo = req.body;
    
    const checkResult = formCheck(userInfo);
    const doublCheck = await checkId(userInfo.id);

    const finalCheck = checkResult && doublCheck;

    if(!finalCheck){
        return res.status(400).send(ERRO_MES);
    }

    try{
        const result = await insertUserInfo(userInfo);
        console.log('result :', result);
        res.sendStatus(200);
    }catch{
        res.sendStatus(500);
    }   
});

router.get('/registerSuccess', (req, res) => {
    res.render('registerSuccess'); // (4)
});

router.get('/login', (req, res) => {
    res.render('login'); // (4)
});

router.post('/idCheck', async(req, res) => {
    const id = req.body.id
    const hasId = await checkId(id)
    res.json({
        hasId: hasId
    })
})

module.exports = router;