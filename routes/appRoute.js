async function get(ctx) {
    (ctx.isAuthenticated()) ? await ctx.render('app/app') : ctx.redirect('/')
}

module.exports.get = get