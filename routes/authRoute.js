const User = require('./../models/user')
module.exports = function auth(passport){
    
    auth.logout = async (ctx) => {
        if (ctx.isAuthenticated()) {
            await ctx.logOut()
            return ctx.redirect('/')
        } else {
            return ctx.redirect('/')
        }
    }
    
    auth.regPost = async (ctx, next) => {
        let user = new User({ username: ctx.request.body.email, password: ctx.request.body.password})
        await user.save(err => {
            ctx.logIn(user, err => {
                ctx.state.user = user;
                return ctx.redirect('/app')
            })
        })
    }
    auth.regGet = async (ctx) => {
        await ctx.render('login', {title: 'ok'})
    }
    return auth
}