const router = require('express').Router();
const { createUser, loginUser } = require('../models/user');

const errorHandler = function(err, req, res, next){
  console.log(err.stack);
  res.status(404).render('index')
}

router.post('/new', createUser, function(req,res) {
  console.log(req.body);
  res.redirect('/');
}, errorHandler);

router.get('/login', function(req,res) {
  res.render('user/login');
}, errorHandler);

router.post('/login', loginUser,function(req,res) {
  console.log(res.user);
  req.session.user = res.user;

  req.session.save(function(err) {
    if(err) throw err;
    res.redirect('/');
  });
}, errorHandler);

router.delete('/logout', function(req,res) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
}, errorHandler);

module.exports = router;
