const Datastore = require('nedb-promises');
const { findSessionID } = require('../api/register/database.js');
const { cookieParser } = require('./middleware/authenticate.js');
let userInfo = Datastore.create('./userInfo.db');

async function mypageCallback(req, res) {
    const session = req.session;
    if(!req.session) res.redirect('/login')
    const userId = session.id;
    const user = await userInfo.findOne({ id: userId });

    res.render('mypage', { name: user.username, id: user.id, email: user.email, phone: user.phoneNum, message: user.username + "님, 환영합니다" });
}

async function registerSuccessCallback(req, res) {
    const session = req.session;
    if(!session) return res.redirect('/login')
    const userId = session.id;
    const user = await userInfo.findOne({ id: userId });

    res.render('mypage', { name: user.username, id: user.id, email: user.email, phone: user.phoneNum, message: "회원이 되셨습니다" });
}

module.exports = { mypageCallback, registerSuccessCallback }