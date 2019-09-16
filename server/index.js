const express = require('express');

const app = express();
app.set('secret','qwerdfb')

app.use(require('cors')());//跨域模块
app.use(express.json());//为了使用admin/index下的await功能
app.use('/uploads',express.static(__dirname + '/uploads'))
app.use('/admin/',express.static(__dirname + '/admin'))
app.use('/',express.static(__dirname + '/web'))

require('./routes/admin')(app)
require('./routes/web')(app)
require('./plugins/db')(app)


app.listen(9573,() => {
    console.log("http://localhost:9573")
})