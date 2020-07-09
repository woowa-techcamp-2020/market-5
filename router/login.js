const Datastore = require('nedb-promises');
let userInfo = Datastore.create('./userInfo.db')
let sessionDB = Datastore.create('./session.db');

const {insertSessionID} = require('../api/register/database.js');

async function loginCallback(req, res){
    console.log('cookie:', req.headers.cookie)
    
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

    const sessionID = Math.floor(Math.random()*10000000);
    const session = await insertSessionID(id, sessionID);

    return res
            .status(200)
            .cookie('sessionID', sessionID, {httpOnly:true, secure:false})
            .json({
                mes : '로그인 성공',
            })
}

module.exports = loginCallback;