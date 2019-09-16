
// const schema = new mongoose.Schema({
//     name: {type: String},
//     parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},//虽然看似是String类型，其实是属于mongoose里的id，并且连接其关注模型
// })

// module.exports = mongoose.model('Category',schema)

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
})

schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})

schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})

module.exports = mongoose.model('Category', schema)