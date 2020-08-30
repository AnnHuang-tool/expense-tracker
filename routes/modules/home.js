// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 record model
const Record = require('../../models/record')
const Category = require('../../models/category')
// 定義首頁路由

// router.get('/', (req, res) => {
//   Record.find()
//     .lean()
//     .then(record => res.render('index', { record }))
//     .catch(error => console.error(error))
//   // past the movie data into 'index' partial template
//   // res.render('index', { restaurants: results })
// })

router.get('/', (req, res) => {
  let category = []
  Record.find()
    .sort({ _id: 1 })
    .lean()
    .then(
      record => {
        record.forEach(item => {
          let cato = []
          Category.find({ name: item.category })
            .lean()
            .then(cate => {
              cato.push(cate[0].tag)
              category.push(cato)
            })
            .catch(error => console.error(error))
        })
        res.render('index', { record, category })
      })
    .catch(err => console.error(err))
})
// 匯出路由模組
module.exports = router