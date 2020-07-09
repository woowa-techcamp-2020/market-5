const {cookieParser} = require('./middleware/authenticate.js');
const {findSessionID, deleteSessionID} = require('../api/register/database.js');

async function deleteCookie(req, res){
    const cookies = req.headers.cookie;
    if(!cookies) return res.redirect('/');
    const parsedCookie = cookieParser(cookies);
    const sessionID = parsedCookie.sessionID;
    if(!sessionID) return res.redirect('/');
    await deleteSessionID(sessionID);
    return res.cookie('sessionID', '').redirect('/');
}

module.exports = deleteCookie;