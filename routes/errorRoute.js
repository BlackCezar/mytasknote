async function notFound(ctx) {
    await ctx.render('error', {
        err: ctx.status,
        options: {
        title: 'Ошибка, нет такой страницы'
        }
    })
}
async function stub(ctx) {
    await ctx.render('error', {
        err: 403,
        msg: "Извини, но эта страница находится на стадии разработки",
        options: {
            title: 'Разработка'
        }
    })
}

module.exports.notFound = notFound
module.exports.stub = stub