const express = require('express');

const { registerCallback } = require('./register.js');
const doubleCheckId = require('./doubleCheckId.js');
const {loginCallback, checkLogined} = require('./login.js');
const {authenticate, cookieParser} = require('./middleware/authenticate.js');
const loginCallback = require('./login.js');
const deleteCookie = require('./cookie.js');
const { mypageCallback, registerSuccessCallback } = require('./mypage.js');
const loginChecked = require('./loginChecked.js');
const mainCallback = require('./main.js');

const router = express.Router();

// get

router.get('/', async(req, res) => {
    await mainCallback(req, res);
});
router.get('/register', async(req, res) => {
    res.render('./Register/register'); // (4)
});

router.get('/register/success', authenticate, async(req, res) => {
    await registerSuccessCallback(req, res);
});
router.get('/mypage', authenticate, async(req, res) => {
    await mypageCallback(req, res);
});
router.get('/login', authenticate, async(req, res) => {
    await loginChecked(req, res);
});
router.get('/logout', async(req, res) => {
    await deleteCookie(req, res);
})
// post

router.post('/register', async(req, res) => {
    await registerCallback(req, res);
});
router.post('/register/check/id', async(req, res) => {
    await doubleCheckId(req, res);
});
router.post('/login', async(req, res) => {
    await loginCallback(req, res);
});

// delete
router.delete('/cookie', deleteCookie)

module.exports = router;