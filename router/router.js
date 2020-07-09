const express = require('express');

const { registerCallback } = require('./register.js');
const doubleCheckId = require('./doubleCheckId.js');

const router = express.Router();

// get

router.get('/', (req, res) => {
    res.render('main'); // (3)
});
router.get('/register', (req, res) => {
    res.render('./Register/register'); // (4)
});

router.get('/registerSuccess', (req, res) => {
    res.render('registerSuccess'); // (4)
});

router.get('/login', (req, res) => {
    res.render('login'); // (4)
});

// post

router.post('/register', registerCallback);
router.post('/register/check/id', doubleCheckId)

module.exports = router;