module.exports = options => {

    const jwt = require('jsonwebtoken');
    const AdminUser = require('../models/AdminUser');
    const assert = require('http-assert');

    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()//由于在baerer中定义了空格，所以用空格分开数据
        assert(token, 401, '请提供jwt token')
        const { id } = jwt.verify(token, req.app.get('secret'));//auth中访问不了app，所以要加req.app
        assert(id, 401, '无效的jwt token')
        req.user = await AdminUser.findById(id);//req,res是全局变量，如果是const只能这个函数内使用
        assert(req.user, 401, '请先登录！')
        console.log(req.user)
        await next()
    }
}



// module.exports = options => async (req, res, next) => {
//     const token = String(req.headers.authorization || '').split(' ').pop()//由于在baerer中定义了空格，所以用空格分开数据
//     assert(token, 401, '请提供jwt token')
//     const { id } = jwt.verify(token, app.get('secret'));
//     assert(id, 401, '无效的jwt token')
//     req.user = await AdminUser.findById(id);//req,res是全局变量，如果是const只能这个函数内使用
//     assert(req.user, 401, '请先登录！')
//     console.log(req.user)
//     await next()
// }