module.exports = options => {
    return async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)//用于转类名
        //return res.send({modelName})
        req.Model = require(`../models/${modelName}`)//会把小写复数categories转为req.Model
        next()
    }
}