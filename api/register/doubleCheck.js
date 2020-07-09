const Datastore = require('nedb-promises')
let userInfo = Datastore.create('./userInfo.db')

module.exports.checkId = async function checkId(id) {
    console.log(id);
    let data = await userInfo.find({ id: id })
    console.log(data);
    if (data.length) return false;
    return true;
}