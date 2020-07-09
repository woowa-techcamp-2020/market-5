const express = require('express');
const path = require('path');
const app = express();
const route = require('./router/router.js');
const cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', route);

app.set('view engine', 'pug'); // (1)
// 에러 처리 부분
app.listen(8000, () => {
    console.log('Express App on http://localhost:8000');
});