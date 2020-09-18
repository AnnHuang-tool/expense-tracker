const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: '爸爸',
  email: '123@gmail.com',
  password: '123'
}


const SEED_DATA = [
  {
    name: '早餐',
    merchant: '晨間廚房',
    category: '餐飲食品',
    date: '2020-09-18',
    amount: 50
  },
  {
    name: '午餐',
    merchant: '八方雲集',
    category: '餐飲食品',
    date: '2020-09-20',
    amount: 60
  },
  {
    name: '晚餐',
    merchant: '四海遊龍',
    category: '餐飲食品',
    date: '2020-09-25',
    amount: 100
  },
  {
    name: '晚餐',
    merchant: '胖熊貓',
    category: '餐飲食品',
    date: '2020-09-27',
    amount: 120
  },

]
db.once('open', () => {
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({ name: SEED_USER.name, email: SEED_USER.email, password: hash }))
    .then(user => {
      const userId = user._id
      return Promise.all(
        SEED_DATA.map(data => {
          data.userId = userId
          return Record.create(data)
        })
      )
    })
    .then(() => {
      console.log('User done')
      process.exit()
    })
    .catch(error => res.render('error'))
})