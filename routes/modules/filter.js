const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  let income = 0
  let expense = 0
  let incomeList = []
  let expenseList = []
  const title = req.query.sort
  const month = req.query.month
  const months = []
  let dataList = {}

  if (title === 'all') {
    dataList = { date: { $regex: month } }
  } else if (title === 'all') {
    dataList = { category: title }
  } else {
    dataList = { $and: [{ category: title }, { date: { $regex: month } }] }
  }

  Record.find({ userId })
    .lean()
    .then(records => {
      records.forEach(record => {
        const date = record.date.slice(0, 7)
        if (!months.includes(date)) {
          months.push(date)
        }
      })
      Record.find(dataList)
        .lean()
        .sort({ date: '-1' })
        .then(records => {
          records.forEach(record => {
            if (record.category === '收益') {
              incomeList.push(record.amount)
            } else {
              expenseList.push(record.amount)
            }
          })
          income += incomeList.reduce((a, b) => { return a + b }, 0)
          expense += expenseList.reduce((a, b) => { return a + b }, 0)
          totalAmount += income - expense

          Category.find()
            .lean()
            .sort({ _id: '1' })
            .then(categories => res.render('index', { records, categories, month, months, totalAmount }))
            .catch(error => console.log(error))
        })
    })
})
module.exports = router