const Datastore = require('nedb-promises');
const { findSessionID } = require('../api/register/database.js');
const {cookieParser} = require('./middleware/authenticate.js');
let userInfo = Datastore.create('./userInfo.db');

async function mypageCallback(req, res){
    const session = req.session;
    const userId = session.id;
    const user = await userInfo.findOne({ id: userId });

    res.render('mypage', { name: user.username, id: user.id, email: user.email, phone: user.phoneNum });
}

module.exports = mypageCallback