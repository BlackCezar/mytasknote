const serv = require('../server'),
      app = serv.app,
      passport = serv.passport,
      router = serv.router
// Маршруты 
const mainRoute = require('./mainRoute'),
      error = require('./errorRoute'),
      auth = require('./authRoute')(passport),
      appRoute = require('./appRoute')
      projectRoute = require('./projectRoute')(passport),
      orgRoute = require('./orgRoute')

router.get('/', mainRoute.get)
router.post('/', mainRoute.post)
router.get('/auth/logout', auth.logout)
router.get('/app', appRoute.get)
router.get('/auth/reg', auth.regGet)
router.post('/auth/reg', auth.regPost)
router.post('/app/projects/create', projectRoute.createProject)
router.get('/app/projects/:id/remove', projectRoute.removeProject)
router.get('/stub', error.stub)
router.get('/org', orgRoute.get)

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