const { checkId } = require('../api/register/doubleCheck.js')
const formCheck = require('../api/register/formCheck.js');
const { insertUserInfo } = require('../api/register/database.js');
const encryption = require('../api/register/encryption.js');

async function registerCallback(req, res) {
    const ERRO_MES = '다시 입력해주세요';
    const SUCC_MES = "회원가입이 완료되었습니다";
    const ERRO_SERVER = "서버 에러입니다. 죄송합니다 ㅜ";

    const userInfo = req.body;

    const checkResult = formCheck(userInfo);
    const doublCheck = !await checkId(userInfo.id);

    const finalCheck = checkResult && doublCheck;

    if (!finalCheck) {
        return res.status(400).json({
            mes: ERRO_MES,
        })
    }

    try {
        //로그인할때 똑같이 사용해야 함
        userInfo.password = encryption(userInfo.password)

        const result = await insertUserInfo(userInfo);
        console.log('result :', result);
        return res.status(200).json({
            mes: SUCC_MES,
        })
    } catch {
        return res.status(500).json({
            mes: ERRO_SERVER,
        })
    }
}

module.exports = { registerCallback }