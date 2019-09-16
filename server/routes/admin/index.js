module.exports = app => {
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const AdminUser = require('../../models/AdminUser');
    const assert = require('http-assert');
    const router = express.Router({
        mergeParams: true//合并URL参数，让所有接口接受数据
    }
    );//子路由
    //const Category = require('./../../models/Category');
    router.post('/', async (req, res) => {
        //const Model = require(`../../models/${req.params.resource}`)
        const model = await req.Model.create(req.body);//创建一个资源
        res.send(model);//发回客户端
    });
    router.put('/:id', async (req, res) => {//修改
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);//编辑一个资源
        res.send(model);//发回客户端
    });
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body);//删除一个,删除不需要返回值，只需要向客户端返回一个success
        res.send({
            success: true
        });//发回客户端
    });
    //资源列表
    router.get('/'
        , async (req, res) => {
            const queryOptions = {};
            if (req.Model.modelName === 'Category') {
                queryOptions.populate = 'parent';
            };
            const items = await req.Model.find().setOptions(queryOptions).limit(100);//populate是关联数据,存放parent对象
            res.send(items);
        })
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model);
    })
    //登录校验中间件
    const authMiddleware = require('../../middleware/auth')//由于auth定义的是函数所以aM需要用()

    const resourceMiddleware = require('../../middleware/resource')

    app.use('/admin/api/rest/:resource', authMiddleware(),resourceMiddleware() , router)

    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file;
        file.url = `http://localhost:9573/uploads/${file.filename}`;
        res.send(file);
    })



    //登录页面路由
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body//结构化之后取数据直接取body.username或body.password
        //1.根据用户名找用户
        const user = await AdminUser.findOne({ username }).select('+password')//由于在前面设置密码不可见，所以在这一行需取出密码
        assert(user, 422, '用户不存在');
        console.log(username, password),
            console.log('user--->', user)
        // if (!user){
        //     return res.status(422).send({
        //         message:'用户不存在！'
        //     })
        // }

        //2.校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // if(!isValid){
        //     return res.status(422).send({
        //         message:'密码不正确！'
        //     })
        // }
        //3.返回token
        const token = jwt.sign({ id: user._id }, app.get('secret'));
        res.send({ token });
    })

    //错误处理
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}