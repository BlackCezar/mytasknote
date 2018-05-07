const serv = require('../server'),
      app = serv.app,
      passport = serv.passport,
      router = serv.router
// Маршруты 
const mainRoute = require('./mainRoute'),
      error = require('./errorRoute'),
      auth = require('./authRoute')(passport),
      appRoute = require('./appRoute')

router.get('/', mainRoute.get)
router.post('/', mainRoute.post)
router.get('/logout', auth.logout)
router.get('/app', appRoute.get)
router.get('/reg', auth.regGet)
router.post('/reg', auth.regPost)
// Обработка ошибок
app.use(async (ctx, next) => {
  try {
    await next()
    if (ctx.status === 404) {
      ctx.throw (404, error.notFound)
    } 
  } catch (err) {
      ctx.status = err.statusCode || err.status || 500
      if (ctx.method == 'GET') {
        return ctx.render ('error', {
          msg: err.message,
          err: ctx.status,
          options: {
            title: 'Ошибка'
          }
        })
      } else {
        ctx.body = err.message
      }
    }
})