// Создание приложения
const Koa = require('koa')
const app = new Koa()
// Подключение модулей
const render = require('koa-ejs'),
      serve = require('koa-static'),
      views = require('koa-views'),
      convert = require('koa-convert'),
      path = require('path'),
      session = require('koa-generic-session'),
      log = require('./lib/winstone')(module),
      Router = require('koa-router'),
      bodyParser = require('koa-bodyparser'),
      cookieParser = require('universal-cookie-koa')
// Подключение переменного окружения
require('dotenv').config()
const env = process.env
// Использование мидллвере
app.use(bodyParser())
app.use(cookieParser())
app.keys = ['your-session-secret']
app.use(convert(session()))
app.use(serve('.'))
app.use(serve(__dirname + './public'))
app.use(views(path.join(__dirname, '/views'), {extension: 'ejs'}))
// Объявление пасспорта
const passport = require('koa-passport')
require('./auth')

app.use(passport.initialize())
app.use(passport.session())
// Мой логгер
app.use(async function logger(ctx, next) {
  const start = new Date()
  const ms = new Date() - start
  log.info('%s %s - %s', ctx.method, ctx.url, ms)
  await next()
})
// Объявление роутов
const router = new Router()
  // Экспорт переменных
  module.exports.passport = passport
  module.exports.app = app
  module.exports.router = router

require('./routes');
app.use(router.routes());
app.use(router.allowedMethods());
// Запуск сервера
app.listen(env.SERVER_PORT, () => console.log('Server listening on', env.SERVER_PORT))
