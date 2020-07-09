const Datastore = require('nedb-promises')
let userInfo = Datastore.create('./userInfo.db')

module.exports.checkId = async function checkId(id) {
    let data = await userInfo.find({ id: id })
    if (data.length) return true;
    return false;
}