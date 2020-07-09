const Datastore = require('nedb-promises')
let userDB = Datastore.create('./userInfo.db')
let sessionDB = Datastore.create('./session.db');

function insertUserInfo(userInfo){
    return userDB.insert(userInfo);
}

function insertSessionID(id, sessionID){
    return sessionDB.insert({id, sessionID})
}

module.exports = {insertUserInfo, insertSessionID}