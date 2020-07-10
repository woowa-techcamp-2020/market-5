const Datastore = require('nedb-promises');
const { findSessionID } = require('../api/register/database.js');
const { cookieParser } = require('./middleware/authenticate.js');

async function mypageCallback(req, res) {
    let userInfo = Datastore.create('./userInfo.db');
    const session = req.session;
    if (!req.session) res.redirect('/login')
    const userId = session.id;
    const user = await userInfo.findOne({ id: userId });

    res.render('mypage', { name: user.username, id: user.id, email: user.email, phone: user.phoneNum, message: user.username + "님, 환영합니다" });
}

async function registerSuccessCallback(req, res) {
    let userInfo = Datastore.create('./userInfo.db');

    const session = req.session;
    if (!session) {
        console.log("세션이없네요");
        return res.redirect('/login')
    }
    const userId = session.id;
    const user = await userInfo.findOne({ id: userId });

    res.render('mypage', { name: user.username, id: user.id, email: user.email, phone: user.phoneNum, message: "회원이 되셨습니다" });
}

module.exports = { mypageCallback, registerSuccessCallback }