const router  = require('express').Router();
const { getData, popDropdown } = require('../models/data');

router.get('/',  popDropdown, function(req,res) {
  res.render('data/index', {user: req.session.user, diagnoses: res.diagnoses})
});

router.get('/dataquery', getData, function(req,res) {
  res.send('1, 2, 3, 4, 5')
});

module.exports = router;
