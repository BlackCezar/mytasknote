const Project = require('../models/project')

async function get(ctx) {
    if (ctx.isAuthenticated()) {
        await Project.find({author: ctx.state.user.id}, function(err, pr) {
            (err) ? console.log(err) : ctx.state.projects = pr;
        });
        return ctx.render('app/app', {user: ctx.state.user, projects: ctx.state.projects})
    } else return ctx.redirect('/')
}

module.exports.get = get