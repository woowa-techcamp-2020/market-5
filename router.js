const express = require('express');
const { checkId } = require('./doubleCheck.js')

const router = express.Router();
router.get('/', (req, res) => {
    res.render('main'); // (3)
});
router.get('/register', (req, res) => {
    res.render('./Register/register'); // (4)
});

router.post('/register', (req, res) => {
    res.render('./Register/register'); // (4)
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