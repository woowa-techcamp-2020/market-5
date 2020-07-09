const { findSessionID } = require('../api/register/database.js');
const {cookieParser} = require('./middleware/authenticate.js');

async function loginChecked(req, res){
    if(req.session) return res.render('loginChecked');
}

module.exports = loginChecked;