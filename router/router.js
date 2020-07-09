const express = require('express');

const { registerCallback } = require('./register.js');
const doubleCheckId = require('./doubleCheckId.js');
const loginCallback = require('./login.js');
const { authenticate, cookieParser } = require('./middleware/authenticate.js');
const deleteCookie = require('./cookie.js');
const mypageCallback = require('./mypage.js');
const loginChecked = require('./loginChecked.js');

const router = express.Router();

// get

router.get('/', (req, res) => {
    res.render('main'); // (3)
});
router.get('/register', (req, res) => {
    res.render('./Register/register'); // (4)
});

router.get('/mypage', authenticate, mypageCallback);
router.get('/login', authenticate, loginChecked);

// post

router.post('/register', registerCallback);
router.post('/register/check/id', doubleCheckId);
router.post('/login', loginCallback);

// delete
router.delete('/cookie', deleteCookie)

module.exports = router;