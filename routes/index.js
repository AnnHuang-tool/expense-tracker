// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 準備引入路由模組
// 引入 home 模組程式碼
const home = require('./modules/home')
// 引入 res 模組程式碼
const expense = require('./modules/expense')
const users = require('./modules/users')  // add this
const { authenticator } = require('../middleware/auth')  // 掛載 middleware

router.use('/expense', authenticator, expense) // 加入驗證程序



// 總路由器引用 users 模組
router.use('/users', users)
router.use('/', authenticator, home) // 加入驗證程序
// 匯出路由器
module.exports = router
