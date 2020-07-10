const Datastore = require('nedb-promises')

function insertUserInfo(userInfo) {
    let userDB = Datastore.create('./userInfo.db')
    return userDB.insert(userInfo);
}

function insertSessionID(id, sessionID) {
    let sessionDB = Datastore.create('./session.db');
    return sessionDB.insert({ id, sessionID })
}

function findSessionID(sessionID) {
    let sessionDB = Datastore.create('./session.db');
    console.log('sessionID: ', sessionID)
    return sessionDB.findOne({ 'sessionID': sessionID.trim() })
}

function deleteSessionID(sessionID) {
    let sessionDB = Datastore.create('./session.db');
    return sessionDB.remove({ sessionID: sessionID });
}

module.exports = { insertUserInfo, insertSessionID, findSessionID, deleteSessionID }