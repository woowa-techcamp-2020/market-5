const Datastore = require('nedb-promises')

module.exports.checkId = async function checkId(id) {
    let userInfo = Datastore.create('./userInfo.db')
    let data = await userInfo.find({ id: id })
    if (data.length) return true;
    return false;
}