if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT
// app.js
// require packages used in the project
const express = require('express')
const session = require('express-session')
// / 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const methodOverride = require('method-override')
const passport = require('passport')
const flash = require('connect-flash')   // 引用套件
const bodyParser = require('body-parser')
// 引用路由器
const routes = require('./routes')
require('./config/mongoose')
const app = express()
// const mongoose = require('mongoose') // 載入 mongoose
// const MONGODB_URI = process.env.MONGODB_URI
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) // 設定連線到 mongoDB
// 取得資料庫連線狀態
// const db = mongoose.connection
// // 連線異常
// db.on('error', () => {
//   console.log('mongodb error!')
// })
// // 連線成功
// db.once('open', () => {
//   console.log('mongodb connected!')
// })

// require handlebars in the project
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))



app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
// 將 request 導入路由器
app.use(flash())  // 掛載套件
app.use(session({
  secret: process.env.SESSION_SECRET || 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

//use passport
app.use(passport.initialize());
app.use(passport.session());

//require passport config
require("./config/passport")(passport);

app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  res.locals.user = req.user
  next()
})

app.use(routes)

// routes setting
// app.get('/', (req, res) => {
//   res.render('index')
// })




// start and listen on the Express server
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})