// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 record model
const Record = require('../../models/record')
const Category = require('../../models/category')


//all view
router.get('/', (req, res) => {
  const userId = req.user._id   // 變數設定   
  Record.find({ userId })// 加入查詢條件
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

router.get('/filter/month/:ym', (req, res) => {
  const userId = req.user._id
  return Record.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      const selectedRecords = []
      records.forEach(record => {
        if (record.date.includes(req.params.ym)) {
          selectedRecords.push(record)
        }
      })

      records = selectedRecords
      let totalAmount = 0
      if (records.length !== 0) {
        totalAmount = records.map(record => Number(record.amount)).reduce((total, amount) => total + amount)
      }
      const ym = req.params.ym
      res.render('index', { records, totalAmount, ym })
    })
})



module.exports = router