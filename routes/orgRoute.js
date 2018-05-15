async function get(ctx) {
    await ctx.render('org/org')
}

module.exports.get = get
