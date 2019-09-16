module.exports = app =>{
    const mongoose = require("mongoose")
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',{
        useNewUrlParser: true
    })


    require('require-all')(__dirname + '/../models')//用途是通过require-all插件将models里的js插件引用
}