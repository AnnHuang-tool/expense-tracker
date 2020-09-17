const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  merchant: {
    type: String,
    default: true
  },
  amount: {
    type: String,
    required: true
  },
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }

})
module.exports = mongoose.model('Record', expSchema)