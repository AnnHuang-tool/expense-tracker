const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// 新增
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  // 變數設定
  const userId = req.user._id
  const { name, date, merchant, category, amount } = req.body

  return Record.create({ name, date, merchant, category, amount, userId })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

// 編輯

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findById({ _id, userId })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const editRecord = req.body
  return Record.findById({ _id, userId })
    .then(record => {
      Object.assign(record, editRecord)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findById({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// router.post('/new', (req, res) => {
//   const { name, category, date, amount } = req.body
//   return Record.create({ name, category, date, amount })
//     .then(() => res.redirect('/')
//       .catch(error => console.log(error)))
// })

// // 瀏覽
// router.get('/:id', (req, res) => {
//   const id = req.params.id
//   return Expense.findById(id)
//     .lean()
//     .then(expense => res.render('show', { expense }))
//     .catch(error => console.log(error))
// })

// // 編輯修改
// router.get('/:id/edit', (req, res) => {
//   const id = req.params.id
//   return Expense.findById(id)
//     .lean()
//     .then((expense) => res.render('edit', { expense }))
//     .catch(error => console.log(error))
// })

// // Update 功能：資料庫修改特定 res 的資料
// router.put('/:id', (req, res) => {
//   const id = req.params.id
//   const { name, category, date, amount } = req.body
//   return Expense.findById(id)
//     .then(Expense => {
//       Expense.name = name
//       Expense.category = category
//       Expense.date = date
//       Expense.amount = amount
//       return Expense.save()
//     })
//     .then(() => res.redirect(`/expense/${id}`))
//     .catch(error => console.log(error))
// })



// // 刪除
// router.delete('/:id', (req, res) => {
//   const id = req.params.id
//   return Expense.findById(id)
//     .then(expense => expense.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// router.get('/:expense_id', (req, res) => {
//   const expense = results.find(expense => expense.id.toString() === req.params.restaurant_id)
//   res.render('show', { expense: expense })
// })

// router.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const expense = results.filter(restaurants => {
//     return expense.name.toLowerCase().includes(keyword.toLowerCase()) ||
//       expense.category.toLowerCase().includes(keyword.toLowerCase())
//   })
//   res.render('index', { expense, keyword })
// }
// )
module.exports = router