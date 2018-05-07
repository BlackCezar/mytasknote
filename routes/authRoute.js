const User = require('./../models/user')
module.exports = function auth(passport){
    
    auth.logout = async (ctx) => {
        if (ctx.isAuthenticated()) {
            console.log(ctx.isAuthenticated())
            await ctx.logOut()
            await ctx.redirect('/')
        } else {
            await ctx.redirect('/')
        }
    }
    
    auth.regPost = async (ctx, next) => {
        let user = new User({ username: ctx.request.body.email, password: ctx.request.body.password})
        await user.save(err => {
            return err ? next(err) : ctx.logIn(user, err => {
                return err ? next(err) : ctx.redirect('/app')
            })
        })
    }
    auth.regGet = async (ctx) => {
        console.log('sad')
        await ctx.render('login', {title: 'ok'})
    }
    return auth
}