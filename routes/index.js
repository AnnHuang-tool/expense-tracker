// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 準備引入路由模組
// 引入 home 模組程式碼
const home = require('./modules/home')
// 引入 res 模組程式碼
const expense = require('./modules/expense')
const users = require('./modules/users')  // add this


// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', home)



// 將網址結構符合 /expense 字串開頭的 request 導向 expense 模組
router.use('/expense', expense)
// 總路由器引用 users 模組
router.use('/users', users)
// 匯出路由器
module.exports = router
