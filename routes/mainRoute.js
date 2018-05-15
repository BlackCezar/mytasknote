const serv = require('../server')


async function get(ctx) {
    ctx.set('Content-Type', 'text/html')
    await ctx.render('main')
}
async function post (ctx, next) {
    console.log(ctx.request.body)
    await serv.passport.authenticate('local', (err, user, info) => {
        if (err) {next(err)} else {
            if (user) {
                ctx.logIn(user)
                ctx.redirect('/app')
            } else ctx.redirect('/')
        } 
    })(ctx, next)
}
module.exports.get = get
module.exports.post = post