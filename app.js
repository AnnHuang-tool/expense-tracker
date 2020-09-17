
// app.js
// require packages used in the project
const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000
  / 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
// 引用路由器
const routes = require('./routes')
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// require handlebars in the project
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
// 將 request 導入路由器
app.use(routes)

// routes setting
// app.get('/', (req, res) => {
//   res.render('index')
// })




// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})