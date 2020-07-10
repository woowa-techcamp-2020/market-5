const Datastore = require('nedb-promises');
const encryption = require('../api/register/encryption.js');
const {findSessionID} =  require('../api/register/database.js');
const { cookieParser } = require('./middleware/authenticate.js');
const { insertSessionID } = require('../api/register/database.js');
const { render } = require('pug');

let sessionDB = Datastore.create('./session.db');
let userInfo = Datastore.create('./userInfo.db');


function checkLogined(req, res, next){
    const cookies = req.headers.cookie;
    const parsedCookie = cookieParser(cookies);

    const sessionID = parsedCookie.sessionID;
    if(!sessionID) return next();

    findSessionID(sessionID)
    .then(user => {
        if(user) return res.render('loginAlready');
        return next();
    })
    .catch(err => {
        return next();
    })
}

async function loginCallback(req, res) {

    const ERR_ID = "아이디가 맞지 않습니다."
    const ERR_PASSWORD = "비밀번호가 맞지 않습니다."
    const id = req.body.id;
    const password = req.body.password;

    const user = await userInfo.find({ id: id })

    if (!user.length) return res.status(400).json({
        mes: ERR_ID,
    })

    const encryptedPassword = encryption(password);
    if (user[0].password !== encryptedPassword) return res.status(400).json({
        mes: ERR_PASSWORD,
    })

    const randomNum = String(Math.floor(Math.random()*1000000));
    const sessionID = String(encryption(randomNum));
    const session = await insertSessionID(id, sessionID);

    return res
            .cookie('id', id, {httpOnly:true, secure:false})
            .cookie('sessionID', sessionID, { expires: new Date(Date.now() + 900000), httpOnly:true, secure:false})
            .render('mypage');
}

module.exports = {loginCallback, checkLogined};