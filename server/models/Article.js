// const mongoose = require('mongoose')

// const schema = new mongoose.Schema({
//     title: {type: String},
//     categories:[{type: mongoose.SchemaTypes.ObjectId,ref: 'Category'}],
//     body:{type: String},
// })

// module.exports = mongoose.model('Article',schema)
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  title: { type: String },
  body: { type: String },
}, {
  timestamps: true//添加时间
})

module.exports = mongoose.model('Article', schema)