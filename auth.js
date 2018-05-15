require('dotenv').config()
const passport = require('koa-passport'),
      User = require('./models/user.js'),
      Project = require('./models/project'),
      mongoose = require('mongoose'),
      env = process.env
mongoose.Promise = global.Promise;
// Подключение к БД
try {
  mongoose.connect(env.DB_URL, () => {
  console.log('Connected to Mongodb')
  })
  mongoose.set('debug', true)
} catch (err) {
  console.error(err)
}
// Подключение и настройка стратегии паспорта
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(username, password,done){
  User.findOne({ username : username},function(err,user){
    return err 
      ? done(err)
      : user
        ? (password === user.password)
          ? done(null, user)
          : done(null, false, { message: 'Incorrect password.' })
        : done(null, false, { message: 'Incorrect username.' })
  });
}));
// Организация сессий
passport.serializeUser(function(user, done) {
  done(null, user.id)
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err,user){
    err 
      ? done(err)
      : done(null,user)
  });
});
module.exports = mongoose;