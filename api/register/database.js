const Datastore = require('nedb-promises')
let userDB = Datastore.create('./userInfo.db')
let sessionDB = Datastore.create('./session.db');

function insertUserInfo(userInfo){
    return userDB.insert(userInfo);
}

function insertSessionID(id, sessionID){
    return sessionDB.insert({id, sessionID})
}

function findSessionID(sessionID){
    console.log('sessionID:',sessionID)
    return sessionDB.findOne({sessionID : sessionID})
}

function deleteSessionID(sessionID){
    return sessionDB.remove({sessionID : sessionID});
}

module.exports = {insertUserInfo, insertSessionID, findSessionID, deleteSessionID}