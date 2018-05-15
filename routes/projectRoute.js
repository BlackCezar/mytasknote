const Project = require('./../models/project')
module.exports = function project(passport){
    
    project.createProject = async function(ctx) {
        if (ctx.isAuthenticated()) {
            let data = new Project ({
                name: ctx.request.body.name,
                author: ctx.state.user._id,
                dev: []
            })
            let testdata = await data.save()
            return ctx.body = testdata
        } else ctx.redirect('/')
    }
    project.removeProject = async function(ctx) {
        if (ctx.isAuthenticated()) {
          let status = await Project.findByIdAndRemove(ctx.params.id)
          return ctx.body = status
        } else ctx.redirect('/')
    }
     
    return project
}