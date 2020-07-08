const express = require('express');
const path = require('path');
const app = express();
const route = require('./router.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use('/', route);

app.set('view engine', 'pug'); // (1)
// 에러 처리 부분
app.listen(8000, () => {
    console.log('Express App on http://localhost:8000');
});