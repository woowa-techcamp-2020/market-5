const {findSessionID} =  require('../../api/register/database.js');

function authenticate(req, res, next){
    const cookies = req.headers.cookie;

    if(!cookies) return res.render('login');

    const parsedCookie = cookieParser(cookies);

    const sessionID = parsedCookie.sessionID;
    if(!sessionID) return res.render('login');
    const id = parsedCookie.id;

    findSessionID(sessionID)
    .then(session => {
        console.log('session:', session);
        if(!session) return res.render('login');
        req.session = session;
        return next();
    })
    .catch(err => {
        return res.render('login');
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