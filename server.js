const express = require('express');
const path = require('path');
const app = express();
const route = require('./router.js');
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug'); // (1)
app.use('/', route);
// 에러 처리 부분
app.listen(8080, () => {
    console.log('Express App on http://localhost:8001');
});