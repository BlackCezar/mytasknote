async function notFound(ctx) {
    await ctx.render('error', {
        err: ctx.status,
        options: {
        title: 'Ошибка, нет такой страницы'
        }
    })
}

module.exports.notFound = notFound