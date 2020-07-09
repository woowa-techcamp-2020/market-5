function insertUserInfo(userInfo){
    const Datastore = require('nedb-promises')
    let db = Datastore.create('./userInfo.db')
    
    return db.insert(userInfo);
}

module.exports = {insertUserInfo}