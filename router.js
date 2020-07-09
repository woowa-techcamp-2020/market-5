const express = require('express');
const { checkId } = require('./api/register/doubleCheck.js')
const formCheck = require('./api/register/formCheck.js');

const router = express.Router();
router.get('/', (req, res) => {
    res.render('main'); // (3)
});
router.get('/register', (req, res) => {
    res.render('./Register/register'); // (4)
});

router.post('/register', (req, res) => {
    const ERRO_MES = '다시 입력해주세요';
    const userInfo = req.body;
    const checkResult = formCheck(userInfo);

    if(!checkResult){
        res.status(400).send(ERRO_MES);
    }else{
        res.sendStatus(200)
    }
    // res.render('./Register/register'); // (4)
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