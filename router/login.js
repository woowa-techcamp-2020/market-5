const Datastore = require('nedb-promises');
let userInfo = Datastore.create('./userInfo.db')

async function loginCallback(req, res){
    const ERR_ID = "아이디가 맞지 않습니다."
    const ERR_PASSWORD = "비밀번호가 맞지 않습니다."
    const id = req.body.id;
    const password = req.body.password;

    const user = await userInfo.find({ id: id })
    
    if(!user.length) return res.status(400).json({
        mes : ERR_ID,
    })

    if(user[0].password !== password) return res.status(400).json({
        mes : ERR_PASSWORD,
    })

    return res.status(200).json({
        mes : '로그인 성공',
    })
}

module.exports = loginCallback;