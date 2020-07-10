const { findSessionID } = require('../api/register/database.js');
const { cookieParser } = require('./middleware/authenticate.js');
const Datastore = require('nedb-promises')

async function mainCallback(req, res) {
    let userInfo = Datastore.create('./userInfo.db')
    const cookies = req.headers.cookie;
    if (!cookies) return res.render('main', { title: '사장님, 로그인해주세요!', buttonText: '배민사장님광장 로그인', href: '/login' })

    const parsedCookie = cookieParser(cookies);
    const sessionID = parsedCookie.sessionID;

    if (!sessionID) return res.render('main', { title: '사장님, 로그인해주세요!', buttonText: '배민사장님광장 로그인', href: '/login' })

    const session = await findSessionID(sessionID)
    if (!session) return res.render('main', { title: '사장님, 로그인해주세요!', buttonText: '배민사장님광장 로그인', href: '/login' });

    const userId = session.id;
    const user = await userInfo.findOne({ id: userId });

    return res.render('main', { title: `안녕하세요, ${user.username}님`, buttonText: '마이페이지', href: '/mypage', logout: '로그아웃', logoutHref: '/logout' })
}


module.exports = mainCallback;