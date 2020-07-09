const { checkId } = require('../api/register/doubleCheck.js')
async function doubleCheckId(req, res){
    const id = req.body.id
    const hasId = await checkId(id)
    res.json({
        hasId: hasId
    })
}

module.exports = doubleCheckId;