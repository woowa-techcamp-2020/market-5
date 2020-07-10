const {findSessionID} =  require('../../api/register/database.js');

function authenticate(req, res, next){
    const cookies = req.headers.cookie;

    if(!cookies) return next();

    const parsedCookie = cookieParser(cookies);

    const sessionID = parsedCookie.sessionID;

    if(!sessionID) return next();
    const id = parsedCookie.id;

    findSessionID(sessionID)
    .then(session => {
        console.log('session:', session);
        if(!session) return next();
        req.session = session;
        return next();
    })
    .catch(err => {
        return res.redirect('/login');
    })

}

function cookieParser(cookies){
    const cookieList = cookies.split(';');
    const parsedCookie = {}

    cookieList.forEach(cookie => {
        const keyValue = cookie.split('=');
        parsedCookie[keyValue[0].trim()] = keyValue[1].trim();
    })

    return parsedCookie;
}

module.exports = {authenticate, cookieParser}