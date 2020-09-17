// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 record model
const Record = require('../../models/record')
const Category = require('../../models/category')


// router.get('/', (req, res) => {
//   let category = []
//   Record.find()
//     .sort({ _id: 1 })
//     .lean()
//     .then(
//       record => {
//         record.forEach(item => {
//           let cato = []
//           Category.find({ name: item.category })
//             .lean()
//             .then(cate => {
//               cato.push(cate[0].tag)
//               category.push(cato)
//             })
//             .catch(error => console.error(error))
//         })
//         res.render('index', { record, category })
//       })
//     .catch(err => console.error(err))
// })
// // 匯出路由模組
// module.exports = router



//all view
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      let totalAmount = 0
      if (records.length !== 0) {
        totalAmount = records.map(record => Number(record.amount)).reduce((total, amount) => total + amount)
      }
      res.render('index', { totalAmount, records })
    })
})

router.get('/filter/:category', (req, res) => {
  Record.find({ category: `${req.params.category}` })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      let totalAmount = 0
      if (records.length !== 0) {
        totalAmount = records.map(record => Number(record.amount)).reduce((total, amount) => total + amount)
      }
      const params = req.params.category
      res.render('index', { records, totalAmount, params })
    })
})

module.exports = router