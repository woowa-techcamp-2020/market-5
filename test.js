const { checkId } = require('./doubleCheck')

async function test() {
    console.log(await checkId("nohgijin"))
}

test()