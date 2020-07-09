const Datastore = require('nedb-promises');
const express = require('express');
let userInfo = Datastore.create('./userInfo.db');

const { findSessionID, deleteSessionID } = require('../api/register/database.js');
const { registerCallback } = require('./register.js');
const doubleCheckId = require('./doubleCheckId.js');
const loginCallback = require('./login.js');
const { authenticate, cookieParser } = require('./middleware/authenticate.js');
const deleteCookie = require('./cookie.js');

const router = express.Router();

// get

router.get('/', (req, res) => {
    res.render('main'); // (3)
});
router.get('/register', (req, res) => {
    res.render('./Register/register'); // (4)
});

router.get('/mypage', async(req, res) => {
    const sessionId = req.cookies.sessionID;
    // 로그인 되었을경우
    if (sessionId) {
        const userId = (await findSessionID(sessionId)).id;
        const user = await userInfo.findOne({ id: userId })
        res.render('mypage', { name: user.username, id: user.id, email: user.email, phone: user.phoneNum });
    } else {
        //로그인을 하지 않았거나 세션이 만료된 경우
        res.redirect('/login')
    }
});

router.get('/login', (req, res) => {
    res.render('login'); // (4)
});

// router.get('/main', authenticate, (req, res) => {
//     res.render('main');
// })

// post

router.post('/register', registerCallback);
router.post('/register/check/id', doubleCheckId);
router.post('/login', loginCallback);

// delete
router.delete('/cookie', deleteCookie)

module.exports = router;